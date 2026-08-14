import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Body from "./components/Body";
import ClassForm from "./components/ClassForm";
import Summary from "./components/Summary";
import { initialAttendances } from "./data";

const STORAGE_KEY = "lab2_3_attendances";

const normalizeSearchValue = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

const loadAttendances = () => {
  try {
    const savedAttendances = window.localStorage.getItem(STORAGE_KEY);

    if (!savedAttendances) {
      return initialAttendances;
    }

    const parsedAttendances = JSON.parse(savedAttendances);
    return Array.isArray(parsedAttendances) ? parsedAttendances : initialAttendances;
  } catch (error) {
    return initialAttendances;
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [attendances, setAttendances] = useState(loadAttendances);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attendances));
  }, [attendances]);

  const filteredAttendances = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(searchTerm);

    return attendances.filter((attendance) => {
      const matchesSearch =
        normalizedQuery === "" ||
        normalizeSearchValue(attendance.name).includes(normalizedQuery) ||
        normalizeSearchValue(attendance.classId).includes(normalizedQuery);
      const matchesStatus =
        statusFilter === "" || attendance.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [attendances, searchTerm, statusFilter]);

  const handleToggleTheme = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  const handleDeleteAttendance = (attendanceId) => {
    setAttendances((currentAttendances) =>
      currentAttendances.filter((attendance) => attendance.id !== attendanceId)
    );
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <main className="page-container">
        <Title
          darkMode={darkMode}
          onToggleTheme={handleToggleTheme}
        />
        <ClassForm
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onReset={handleResetFilters}
        />
        <Summary attendances={attendances} />
        <Body
          attendances={filteredAttendances}
          onDelete={handleDeleteAttendance}
        />
      </main>
    </div>
  );
}

export default App;

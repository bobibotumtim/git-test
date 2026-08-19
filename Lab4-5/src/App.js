import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import "./App.css";
import Title from "./components/Title";
import Body from "./components/Body";
import CourseDetail from "./components/ClassDetail";
import CourseFilter from "./components/ClassFilter";
import {
  deleteCoursesAPI,
  fetchCoursesAPI,
  updateCoursesAPI,
} from "./services/CourseService";

const normalizeSearchValue = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

function CourseList({ courses, error, isLoading, onRefresh }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";
  const categoryFilter = searchParams.get("category") ?? "ALL";
  const semesterFilter = searchParams.get("semester") ?? "ALL";

  const semesterOptions = useMemo(
    () => [...new Set(courses.map((course) => course.semester).filter(Boolean))].sort(),
    [courses]
  );

  const filteredCourses = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(searchTerm);

    return courses.filter((course) => {
      const searchableText = normalizeSearchValue(
        `${course.code} ${course.nameEn} ${course.nameVi}`
      );
      const matchesSearch =
        normalizedQuery === "" || searchableText.includes(normalizedQuery);
      const matchesCategory =
        categoryFilter === "ALL" || course.category === categoryFilter;
      const matchesSemester =
        semesterFilter === "ALL" || course.semester === semesterFilter;

      return matchesSearch && matchesCategory && matchesSemester;
    });
  }, [courses, searchTerm, categoryFilter, semesterFilter]);

  const updateQueryParameter = (name, value, defaultValue = "") => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (!value || value === defaultValue) {
      nextSearchParams.delete(name);
    } else {
      nextSearchParams.set(name, value);
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  return (
    <main className="courses-page">
      <Title
        semesterOptions={semesterOptions}
        semesterFilter={semesterFilter}
        isRefreshing={isLoading}
        onSemesterChange={(value) =>
          updateQueryParameter("semester", value, "ALL")
        }
        onRefresh={onRefresh}
      />

      <div className="page-container courses-content">
        <CourseFilter
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          resultCount={filteredCourses.length}
          onSearchChange={(value) => updateQueryParameter("q", value)}
          onCategoryChange={(value) =>
            updateQueryParameter("category", value, "ALL")
          }
        />

        {error && (
          <div className="api-message api-message--error" role="alert">
            <span>{error}</span>
            <button type="button" onClick={onRefresh}>
              Try again
            </button>
          </div>
        )}

        {isLoading && courses.length === 0 ? (
          <div className="course-grid" role="status">
            <span className="sr-only">Loading courses...</span>
            {[1, 2, 3].map((item) => (
              <div className="course-card course-card--skeleton" key={item} />
            ))}
          </div>
        ) : !error || courses.length > 0 ? (
          <Body courses={filteredCourses} />
        ) : null}
      </div>
    </main>
  );
}

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCourses = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const loadedCourses = await fetchCoursesAPI();
      setCourses(loadedCourses);
    } catch (requestError) {
      setError(
        "Unable to load courses. Make sure JSON Server is running on port 9000."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleDeleteCourse = async (courseId) => {
    const selectedCourse = courses.find(
      (course) => String(course.id) === String(courseId)
    );

    if (!selectedCourse) return false;

    const isConfirmed = window.confirm(
      `Delete ${selectedCourse.code} – ${selectedCourse.nameEn}?`
    );

    if (!isConfirmed) return false;

    try {
      await deleteCoursesAPI(courseId);
      setCourses((currentCourses) =>
        currentCourses.filter(
          (course) => String(course.id) !== String(courseId)
        )
      );
      setError("");
      return true;
    } catch (requestError) {
      setError("Unable to delete this course. Please try again.");
      throw requestError;
    }
  };

  const handleToggleClass = async (courseId, classId) => {
    const selectedCourse = courses.find(
      (course) => String(course.id) === String(courseId)
    );

    if (!selectedCourse) throw new Error("Course not found");

    const updatedCourse = {
      ...selectedCourse,
      classes: (selectedCourse.classes ?? []).map((classItem) =>
        classItem.classId === classId
          ? {
              ...classItem,
              status: classItem.status === "active" ? "inactive" : "active",
            }
          : classItem
      ),
    };

    const savedCourse = await updateCoursesAPI(courseId, updatedCourse);
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        String(course.id) === String(courseId) ? savedCourse : course
      )
    );
    return savedCourse;
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/courses"
          element={
            <CourseList
              courses={courses}
              error={error}
              isLoading={isLoading}
              onRefresh={loadCourses}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            isLoading && courses.length === 0 ? (
              <LoadingPage />
            ) : (
              <CourseDetail
                courses={courses}
                error={error}
                onDeleteCourse={handleDeleteCourse}
                onRetry={loadCourses}
                onToggleClass={handleToggleClass}
              />
            )
          }
        />
        <Route path="/classes" element={<Navigate to="/courses" replace />} />
        <Route path="*" element={<Navigate to="/courses" replace />} />
      </Routes>
    </div>
  );
}

function LoadingPage() {
  return (
    <main className="loading-page" role="status">
      <span className="loading-spinner" aria-hidden="true" />
      Loading course data...
    </main>
  );
}

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <CourseManagement />
    </BrowserRouter>
  );
}

export default App;

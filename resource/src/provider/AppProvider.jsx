import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { instance } from "../lib/axios";

const SESSION_KEY = "fptLearningPortalUser";
const ALLOWED_ROLES = ["student", "students", "lecturer"];
const AppContext = createContext(null);

const readStoredUser = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem(SESSION_KEY));
    const hasAccess =
      storedUser &&
      String(storedUser.status).toLowerCase() === "active" &&
      ALLOWED_ROLES.includes(String(storedUser.role).toLowerCase());

    if (hasAccess) return storedUser;

    localStorage.removeItem(SESSION_KEY);
    return null;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(Boolean(user));
  const [subjectsError, setSubjectsError] = useState("");

  const loadSubjects = useCallback(async () => {
    setSubjectsLoading(true);
    setSubjectsError("");

    try {
      const response = await instance.get("/subjects");
      setSubjects(response.data);
    } catch (error) {
      setSubjectsError(
        "Cannot load subjects. Please make sure JSON Server is running on port 9000."
      );
    } finally {
      setSubjectsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadSubjects();
    } else {
      setSubjects([]);
      setSubjectsError("");
    }
  }, [loadSubjects, user]);

  const login = async (email, password) => {
    const response = await instance.get("/accounts");
    const normalizedEmail = email.trim().toLowerCase();
    const account = response.data.find(
      (item) => item.email.toLowerCase() === normalizedEmail
    );

    if (!account || account.password !== password) {
      return { ok: false, reason: "invalid" };
    }

    if (String(account.status).toLowerCase() !== "active") {
      return { ok: false, reason: "inactive" };
    }

    if (!ALLOWED_ROLES.includes(String(account.role).toLowerCase())) {
      return { ok: false, reason: "role" };
    }

    const sessionUser = { ...account };
    delete sessionUser.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setSubjectsLoading(true);
    setUser(sessionUser);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSubjectsLoading(false);
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        subjects,
        subjectsLoading,
        subjectsError,
        login,
        logout,
        reloadSubjects: loadSubjects,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
};

export default AppProvider;

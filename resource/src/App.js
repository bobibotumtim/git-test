import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppProvider, { useAppContext } from "./provider/AppProvider";
import Login from "./components/pages/Login";
import HomePage from "./components/pages/HomePage";
import SubjectInfo from "./components/pages/SubjectInfo";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/syllabus"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subject/:id"
            element={
              <ProtectedRoute>
                <SubjectInfo />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

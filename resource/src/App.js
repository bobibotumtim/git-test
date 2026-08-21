import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppProvider from "./provider/AppProvider";
import Login from "./components/pages/Login";
import HomePage from "./components/pages/HomePage";
import SubjectInfo from "./components/pages/SubjectInfo";
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/syllabus" element={<HomePage />} />
          <Route path="/subject/:id" element={<SubjectInfo />} />

        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App;

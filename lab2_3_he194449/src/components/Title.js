import { FaRegMoon, FaRegSun } from "react-icons/fa";
import "./Title.css";

function Title({ darkMode, onToggleTheme }) {
  return (
    <header className="header">
      <h1 className="header-title">Hệ Thống Quản lý Điểm Danh Lớp học</h1>

      <button
        className="theme-button"
        type="button"
        onClick={onToggleTheme}
        aria-label="Chuyển giao diện sáng tối"
      >
        {darkMode ? <FaRegSun /> : <FaRegMoon />}
      </button>
    </header>
  );
}

export default Title;

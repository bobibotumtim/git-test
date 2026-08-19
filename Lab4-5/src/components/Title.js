import { Link } from "react-router-dom";
import "./Title.css";

const navigationItems = [
  "Courses",
  "Projects",
  "Reviews",
  "Title Confirmation",
  "References",
];

export function TopNavigation() {
  return (
    <nav className="top-navigation" aria-label="Main navigation">
      <div className="page-container top-navigation__inner">
        {navigationItems.map((item) =>
          item === "Courses" ? (
            <Link
              className="top-navigation__link is-active"
              to="/courses"
              aria-current="page"
              key={item}
            >
              {item}
            </Link>
          ) : (
            <span className="top-navigation__link top-navigation__link--placeholder" key={item}>
              {item}
            </span>
          )
        )}
      </div>
    </nav>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 6v5h-5" />
      <path d="M19 11a7 7 0 1 0 .2 3" />
    </svg>
  );
}

function Title({
  semesterOptions,
  semesterFilter,
  isRefreshing,
  onSemesterChange,
  onRefresh,
}) {
  return (
    <>
      <TopNavigation />
      <header className="courses-header">
        <div className="page-container courses-header__inner">
          <div className="courses-heading">
            <p>Welcome back, Lecturer</p>
            <h1>My Courses</h1>
          </div>

          <div className="header-actions">
            <label className="semester-select">
              <span>Semester</span>
              <select
                value={semesterFilter}
                onChange={(event) => onSemesterChange(event.target.value)}
              >
                <option value="ALL">All semesters</option>
                {semesterOptions.map((semester) => (
                  <option value={semester} key={semester}>
                    {semester}
                  </option>
                ))}
              </select>
            </label>
            <button
              className={`refresh-button ${isRefreshing ? "is-refreshing" : ""}`}
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="Refresh courses from API"
            >
              <RefreshIcon />
              <span>{isRefreshing ? "Refreshing" : "Refresh"}</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Title;

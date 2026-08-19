import { Link, useLocation } from "react-router-dom";
import "./Body.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function Body({ courses }) {
  const location = useLocation();
  const returnTo = `${location.pathname}${location.search}`;

  if (courses.length === 0) {
    return (
      <section className="empty-courses" aria-live="polite">
        <div className="empty-courses__icon" aria-hidden="true">⌕</div>
        <h2>No courses found</h2>
        <p>Try another course code, name, category, or semester.</p>
      </section>
    );
  }

  return (
    <section className="course-grid" aria-label="Course list">
      {courses.map((course) => {
        return (
          <Link
            className={`course-card course-card--${course.category?.toLowerCase()}`}
            to={`/detail/${course.id}`}
            state={{ from: returnTo }}
            key={course.id}
            aria-label={`Open ${course.code} ${course.nameEn}`}
          >
            <div className="course-card__top">
              <div className="course-identity">
                <span className="course-badge">{course.badge || course.code.slice(0, 2)}</span>
              </div>
              <span className="category-badge">{course.category}</span>
            </div>

            <div className="course-card__content">
              <p className="course-code">{course.code}</p>
              <h2>{course.nameEn}</h2>
              <p className="course-name-vi">{course.nameVi}</p>
            </div>

            <div className="course-card__footer">
              <span className="get-started">
                Get started <ArrowIcon />
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default Body;

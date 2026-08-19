import "./ClassFilter.css";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function CourseFilter({
  searchTerm,
  categoryFilter,
  resultCount,
  onSearchChange,
  onCategoryChange,
}) {
  return (
    <section className="course-filter" aria-label="Course filters">
      <div className="course-search">
        <SearchIcon />
        <input
          type="search"
          value={searchTerm}
          placeholder="Search by course code or course name..."
          aria-label="Search by course code or name"
          onChange={(event) => onSearchChange(event.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-search"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="category-filter" role="group" aria-label="Course category">
        {[
          { label: "All", value: "ALL" },
          { label: "General", value: "GENERAL" },
          { label: "Tech", value: "TECH" },
        ].map((option) => (
          <button
            className={categoryFilter === option.value ? "is-active" : ""}
            type="button"
            key={option.value}
            aria-pressed={categoryFilter === option.value}
            onClick={() => onCategoryChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <p className="course-result-count" aria-live="polite">
        <strong>{resultCount}</strong> {resultCount === 1 ? "course" : "courses"}
      </p>
    </section>
  );
}

export default CourseFilter;

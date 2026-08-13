import { useState } from "react";

const technologies = [
  "React",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "MongoDB",
  "Express",
];

function SearchFilter() {
  const [query, setQuery] = useState("");

  const filteredItems = technologies.filter((technology) =>
    technology.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="stacked-demo">
      <label htmlFor="technology-search">Search technologies</label>
      <input
        id="technology-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try “react”"
      />
      <ul className="filter-results" aria-live="polite">
        {filteredItems.length > 0 ? (
          filteredItems.map((technology) => (
            <li key={technology}>{technology}</li>
          ))
        ) : (
          <li className="empty-state">No matching technology.</li>
        )}
      </ul>
    </div>
  );
}

export default SearchFilter;

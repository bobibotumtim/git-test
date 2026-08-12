import { useState } from "react";

const technologies = [
  "React",
  "NodeJs",
  "MongoDB",
  "Express",
  "Angular",
  "VueJs",
];

function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTechnologies = technologies.filter((technology) =>
    technology.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="search-demo">
      <div className="search-row">
        <label htmlFor="search-input">Search:</label>
        <input
          id="search-input"
          aria-label="Search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="technology-list" aria-live="polite">
        {filteredTechnologies.length === 0 ? (
          <p>No matching technology.</p>
        ) : (
          filteredTechnologies.map((technology) => (
            <div className="technology-item" key={technology}>
              {technology}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchFilter;

const cards = [
  { color: "primary", title: "First card" },
  { color: "warning", title: "Second card" },
  { color: "danger", title: "Third card" },
];
function Car() {
  return (
    <svg
      className="car"
      viewBox="0 0 500 220"
      role="img"
      aria-label="White SUV"
    >
      <path
        d="M70 145h350l-24-58-77-47H175l-66 49z"
        fill="#f7f7f7"
        stroke="#333"
        strokeWidth="6"
      />
      <path
        d="M181 52h126l61 38H140z"
        fill="#9cd0e8"
        stroke="#333"
        strokeWidth="5"
      />
      <circle cx="145" cy="153" r="38" fill="#222" />
      <circle cx="145" cy="153" r="18" fill="#bbb" />
      <circle cx="365" cy="153" r="38" fill="#222" />
      <circle cx="365" cy="153" r="18" fill="#bbb" />
      <path
        d="M58 125h390v35H60z"
        fill="#fafafa"
        stroke="#333"
        strokeWidth="5"
      />
    </svg>
  );
}
function App() {
  return (
    <main className="container-fluid py-3">
      <h1>Cards Columns</h1>
      <div className="row g-4">
        {cards.map((card) => (
          <div className="col-lg-4" key={card.color}>
            <article
              className={`card border-${card.color} bg-${card.color} p-3 h-100`}
            >
              <div className="image-box">
                <Car />
              </div>
              <div className="card-body text-center">
                <p className="card-text fs-5">
                  Some text inside the {card.title.toLowerCase()}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
}
export default App;

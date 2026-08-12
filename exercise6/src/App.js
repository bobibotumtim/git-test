const products = [
  { id: 1, name: "Modern Chair", oldPrice: "100.000", price: "80.000" },
  { id: 2, name: "Table Lamp", oldPrice: "120.000", price: "80.000" },
  { id: 3, name: "Wall Clock", oldPrice: "95.000", price: "80.000" },
  {
    id: 4,
    name: "Soft Sofa",
    oldPrice: "130.000",
    price: "80.000",
    sale: true,
  },
];

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <a className="navbar-brand" href="#home">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="menu">
            <div className="navbar-nav me-auto">
              <a className="nav-link active" href="#home">
                Home
              </a>
              <a className="nav-link" href="#products">
                Link
              </a>
              <a className="nav-link" href="#products">
                Dropdown
              </a>
            </div>
            <form className="d-flex">
              <input className="form-control me-2" placeholder="Search" />
              <button className="btn btn-outline-primary">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <header className="hero">
        <button aria-label="Previous">‹</button>
        <div>
          <strong>1920 x 530</strong>
          <div className="dots">— — —</div>
        </div>
        <button aria-label="Next">›</button>
      </header>
      <main className="container py-5" id="products">
        <h1 className="h3 fw-normal">NEW PRODUCT</h1>
        <p className="text-secondary">List product description</p>
        <div className="row g-4">
          {products.map((product, index) => (
            <div className="col-sm-6 col-lg-3" key={product.id}>
              <article className="card product-card h-100">
                {product.sale && <span className="sale">Sale</span>}
                <div className="placeholder-image">
                  280 x 280
                  <br />
                  <small>PRODUCT {index + 1}</small>
                </div>
                <div className="card-body">
                  <h2 className="h6 fw-normal">{product.name}</h2>
                  <p>
                    <del>{product.oldPrice} vnd</del>{" "}
                    <span className="price">{product.price} vnd</span>
                  </p>
                  <button className="btn btn-outline-secondary w-100">
                    🛒 Xem chi tiết
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
export default App;

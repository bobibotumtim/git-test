const students = [
  {
    id: "DE160182",
    name: "Nguyễn Hữu Quốc Khánh",
    city: "Da Nang",
    initials: "NK",
  },
  { id: "DE160377", name: "Chợ Vĩnh Thiện", city: "Quang Nam", initials: "VT" },
  { id: "DE160547", name: "Đỗ Nguyên Phúc", city: "Quang Nam", initials: "NP" },
  { id: "DE170049", name: "Lê Hoàng Minh", city: "Da Nang", initials: "HM" },
];

function GridDemo() {
  return (
    <section className="demo-panel">
      <div className="p-5 mb-4 bg-body-secondary rounded-3">
        <h2>Let's test the grid!</h2>
      </div>
      <div className="container grid-demo">
        <div className="row">
          <div className="col-6">First col</div>
          <div className="col-6">Second col</div>
        </div>
        <div className="row">
          <div className="col-4">col</div>
          <div className="col-4">col</div>
          <div className="col-4">col</div>
        </div>
        <div className="row">
          <div className="col-3">col</div>
          <div className="col-3">col</div>
          <div className="col-3">col</div>
          <div className="col-3">col</div>
        </div>
      </div>
      <footer className="demo-footer">Created by ABC!</footer>
    </section>
  );
}

function TechnologyDemo() {
  return (
    <section className="demo-panel text-center">
      <div className="p-5 bg-body-secondary rounded-3">
        <h2>My First Bootstrap Page</h2>
      </div>
      <div className="row g-4 py-5 tech-row">
        <div className="col-md-4">
          <div className="tech-logo html-logo">HTML5</div>
        </div>
        <div className="col-md-4">
          <div className="tech-logo css-logo">CSS3</div>
        </div>
        <div className="col-md-4">
          <div className="tech-logo bootstrap-logo">B</div>
        </div>
      </div>
    </section>
  );
}

function FptDemo() {
  return (
    <section className="demo-panel fpt-site">
      <header>
        <div className="fpt-logo">
          <span>F</span>
          <span>P</span>
          <span>T</span> <strong>Education</strong>
        </div>
        <h2>FPT UNIVERSITY</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main>
        <h2 id="about">About</h2>
        <p>This is the about section of the website.</p>
        <h2 id="contact">Contact</h2>
        <p>For any inquiries, please contact us at example@example.com.</p>
      </main>
      <footer>© 2026 Website. All rights reserved.</footer>
    </section>
  );
}

function StudentDemo() {
  return (
    <section className="demo-panel student-site">
      <div className="student-header">
        <div className="fpt-logo small">
          <span>F</span>
          <span>P</span>
          <span>T</span> <strong>University</strong>
        </div>
        <nav>🏠 Trang chủ　📚 Ngành học　🪪 Sinh viên</nav>
        <label>
          Search: <input type="search" />
        </label>
      </div>
      <div className="student-hero">
        <h2>FPT Students</h2>
        <p>Together we learn, together we grow.</p>
      </div>
      <div className="container py-5">
        <h2 className="text-center mb-4">Students Detail</h2>
        <div className="row g-4">
          {students.map((student) => (
            <div className="col-md-6" key={student.id}>
              <article className="card student-card h-100">
                <div className="student-avatar">{student.initials}</div>
                <div className="card-body text-center">
                  <h3 className="h6">{student.id}</h3>
                  <p>
                    {student.name} · {student.city}
                  </p>
                  <div className="d-flex justify-content-around">
                    <label>
                      <input type="radio" name={student.id} /> Absent
                    </label>
                    <label>
                      <input type="radio" name={student.id} /> Present
                    </label>
                  </div>
                  <button className="btn btn-warning mt-3">Submit</button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="container py-4">
      <h1 className="mb-2">Exercise 5: Bootstrap 5</h1>
      <p className="text-secondary mb-4">
        Các mẫu giao diện Bootstrap theo tài liệu bài tập.
      </p>
      <GridDemo />
      <TechnologyDemo />
      <section className="demo-panel">
        <ul className="nav nav-pills mb-4">
          <li className="nav-item">
            <a className="nav-link active" href="#grid">
              Active
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#grid">
              Link
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#grid">
              Link
            </a>
          </li>
          <li className="nav-item">
            <span className="nav-link disabled">Disabled</span>
          </li>
        </ul>
        <GridDemo />
      </section>
      <FptDemo />
      <StudentDemo />
    </main>
  );
}

export default App;

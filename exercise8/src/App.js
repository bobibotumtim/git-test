import React from "react";

const cities = ["Hà Nội", "Đà Nẵng", "TP. Hồ Chí Minh", "Cần Thơ"];

function App() {
  const [form, setForm] = React.useState({
    name: "",
    address: "",
    from: "Hà Nội",
    to: "Hà Nội",
    depart: false,
    returnTrip: false,
  });
  const [message, setMessage] = React.useState("");
  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validName =
    form.name.trim().length >= 5 && form.name === form.name.toUpperCase();
  const validAddress =
    form.address.trim().length >= 5 &&
    form.address === form.address.toUpperCase();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validName || !validAddress) {
      setMessage("Vui lòng nhập đúng thông tin trước khi đặt vé.");
      return;
    }
    setMessage(`Đặt vé thành công cho ${form.name}: ${form.from} → ${form.to}`);
  };

  return (
    <main className="booking-page">
      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        {message && (
          <div
            className={`alert ${validName && validAddress ? "alert-success" : "alert-warning"}`}
            role="alert"
          >
            {message}
            <button
              type="button"
              className="btn-close float-end"
              onClick={() => setMessage("")}
            />
          </div>
        )}
        <h1>Form đặt vé máy bay</h1>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Họ tên
          </label>
          <div className="input-group">
            <span className="input-group-text">♙</span>
            <input
              id="name"
              name="name"
              className={`form-control ${form.name && !validName ? "is-invalid" : ""}`}
              placeholder="Họ tên"
              value={form.name}
              onChange={update}
            />
            <span className="input-group-text">vnđ</span>
          </div>
          <div className="form-text">Phải nhập 5 ký tự, in hoa...</div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="address">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            className={`form-control ${form.address && !validAddress ? "is-invalid" : ""}`}
            value={form.address}
            onChange={update}
          />
          <div className="form-text">Phải nhập 5 ký tự, in hoa...</div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-6">
            <label className="form-label" htmlFor="from">
              Đi từ
            </label>
            <select
              id="from"
              name="from"
              className="form-select"
              value={form.from}
              onChange={update}
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="col-sm-6">
            <label className="form-label" htmlFor="to">
              Đến
            </label>
            <select
              id="to"
              name="to"
              className="form-select"
              value={form.to}
              onChange={update}
            >
              {cities.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
        <fieldset className="mb-4">
          <legend className="fs-6">Chọn chiều đi (Khứ hồi)</legend>
          <div className="form-check">
            <input
              id="depart"
              name="depart"
              type="checkbox"
              className="form-check-input"
              checked={form.depart}
              onChange={update}
            />
            <label htmlFor="depart" className="form-check-label">
              Đi
            </label>
          </div>
          <div className="form-check">
            <input
              id="returnTrip"
              name="returnTrip"
              type="checkbox"
              className="form-check-input"
              checked={form.returnTrip}
              onChange={update}
            />
            <label htmlFor="returnTrip" className="form-check-label">
              Về
            </label>
          </div>
        </fieldset>
        <button className="btn btn-primary w-100" type="submit">
          Đặt vé
        </button>
      </form>
    </main>
  );
}
export default App;

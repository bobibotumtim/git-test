import { useState } from "react";
import "./ClassForm.css";

const SUBJECTS = [
  "Project Management",
  "Software Development Project",
  "Software Testing",
];

const createInitialForm = () => ({
  name: "",
  subject: "Software Development Project",
  lecturer: "",
  status: "OPEN",
});

function ClassForm({ onAddClass }) {
  const [formData, setFormData] = useState(createInitialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      await onAddClass({
        name: formData.name.trim(),
        subject: formData.subject,
        lecturer: formData.lecturer.trim(),
        status: formData.status,
        enrolled: 0,
        students: [],
      });
      setFormData(createInitialForm());
      setMessage({ type: "success", text: "Thêm lớp thành công." });
    } catch (requestError) {
      setMessage({
        type: "error",
        text: "Không thể thêm lớp. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="add-class-card" aria-label="Thêm lớp học">
      <form className="add-class-form" onSubmit={handleSubmit}>
        <div className="add-class-fields">
          <input
            className="add-control"
            type="text"
            name="name"
            value={formData.name}
            placeholder="Tên lớp..."
            aria-label="Tên lớp"
            onChange={handleChange}
            required
          />
          <select
            className="add-control"
            name="subject"
            value={formData.subject}
            aria-label="Môn học"
            onChange={handleChange}
          >
            {SUBJECTS.map((subject) => (
              <option value={subject} key={subject}>
                {subject}
              </option>
            ))}
          </select>
          <input
            className="add-control"
            type="text"
            name="lecturer"
            value={formData.lecturer}
            placeholder="Giảng viên..."
            aria-label="Giảng viên"
            onChange={handleChange}
            required
          />
        </div>

        <div className="add-status" role="radiogroup" aria-label="Trạng thái lớp">
          {["OPEN", "CLOSED"].map((status) => (
            <label className="add-status-option" key={status}>
              <input
                type="radio"
                name="status"
                value={status}
                checked={formData.status === status}
                onChange={handleChange}
              />
              <span>{status}</span>
            </label>
          ))}
        </div>

        <button className="add-class-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang thêm..." : "Thêm lớp"}
        </button>

        {message.text && (
          <p className={`add-message add-message--${message.type}`} role="status">
            {message.text}
          </p>
        )}
      </form>
    </section>
  );
}

export default ClassForm;

import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./ClassEdit.css";

function ClassEdit({ courses, onUpdateClass }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const courseItem = courses.find((item) => String(item.id) === id);
  const returnTo = location.state?.from ?? "/courses";
  const listFrom = location.state?.listFrom;
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [formData, setFormData] = useState(() => ({
    name: courseItem?.name ?? "",
    subject: courseItem?.subject ?? "",
    lecturer: courseItem?.lecturer ?? "",
    status: courseItem?.status ?? "OPEN",
  }));

  if (!courseItem) {
    return (
      <main courseName="edit-page page-container">
        <div courseName="edit-card">
          <h1>Không tìm thấy lớp học</h1>
          <Link courseName="edit-button edit-button--secondary" to={returnTo}>
            Quay lại danh sách
          </Link>
        </div>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setSaveError("");

    try {
      await onUpdateClass({
        ...courseItem,
        name: formData.name.trim(),
        subject: formData.subject.trim(),
        lecturer: formData.lecturer.trim(),
        status: formData.status,
      });
      navigate(returnTo, {
        replace: true,
        state: listFrom ? { from: listFrom } : undefined,
      });
    } catch (requestError) {
      setSaveError("Không thể lưu thay đổi. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main courseName="edit-page page-container">
      <div courseName="edit-content">
        <Link courseName="back-link" to={returnTo}>
          ← Quay lại danh sách
        </Link>

        <section courseName="edit-card">
          <h1>Cập nhật lớp: {courseItem.name}</h1>
          <form courseName="edit-form" onSubmit={handleSubmit}>
            {saveError && (
              <p courseName="edit-error" role="alert">
                {saveError}
              </p>
            )}
            <label>
              Class Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Subject
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Lecturer
              <input
                type="text"
                name="lecturer"
                value={formData.lecturer}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Status
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="OPEN">OPEN</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </label>

            <div courseName="edit-actions">
              <button
                courseName="edit-button edit-button--primary"
                type="submit"
                disabled={isSaving}
              >
                {isSaving ? "Đang cập nhật..." : "Cập nhật"}
              </button>
              <Link courseName="edit-button edit-button--secondary" to={returnTo}>
                Hủy
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default ClassEdit;

import { useRef } from "react";
import "./ClassForm.css";

function ClassForm({
  statusFilter,
  onSearchChange,
  onStatusChange,
  onReset,
}) {
  const searchInputRef = useRef(null);

  const handleSearch = () => {
    onSearchChange(searchInputRef.current?.value ?? "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }
    onReset();
  };

  return (
    <form className="class-form" onSubmit={handleSubmit}>
      <input
        ref={searchInputRef}
        className="class-control"
        type="text"
        placeholder="Tìm kiếm theo tên sinh viên hoặc mã lớp"
        aria-label="Tìm kiếm sinh viên"
        onChange={handleSearch}
      />

      <select
        className="class-control subject-select"
        value={statusFilter}
        aria-label="Lọc theo trạng thái"
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="">
          Tất cả trạng thái
        </option>
        <option value="PRESENT">
          Có mặt (PRESENT)
        </option>
        <option value="ABSENT">
          Vắng mặt (ABSENT)
        </option>
      </select>

      <button className="reset-filter-button" type="submit">
        Reset bộ lọc
      </button>
    </form>
  );
}

export default ClassForm;

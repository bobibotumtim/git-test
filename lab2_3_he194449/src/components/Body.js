import Table from "react-bootstrap/Table";
import "./Body.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

function Body({ attendances, onDelete }) {
  return (
    <div className="table-wrapper">
      <Table className="class-table" bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã lớp</th>
            <th>Tên sinh viên</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {attendances.length === 0 ? (
            <tr>
              <td className="empty-table-message" colSpan="6">
                Không tìm thấy bản ghi phù hợp.
              </td>
            </tr>
          ) : (
            attendances.map((attendance, index) => (
              <tr key={attendance.id}>
                <td>{index + 1}</td>
                <td>{attendance.classId}</td>
                <td>{attendance.name}</td>
                <td>{formatDate(attendance.date)}</td>
                <td>
                  <span
                    className={`status-button status-button--${attendance.status.toLowerCase()}`}
                  >
                    {attendance.status}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => onDelete(attendance.id)}
                    aria-label={`Xóa ${attendance.name}`}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Body;

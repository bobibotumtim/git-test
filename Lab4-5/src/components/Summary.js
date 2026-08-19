import { useMemo } from "react";
import "./Summary.css";

function Summary({ classes }) {
  const statistics = useMemo(() => {
    const total = classes.length;
    const open = classes.filter((classItem) => classItem.status === "OPEN").length;
    const closed = classes.filter(
      (classItem) => classItem.status === "CLOSED"
    ).length;
    const students = classes.reduce(
      (totalStudents, classItem) => totalStudents + classItem.students.length,
      0
    );

    return { total, open, closed, students };
  }, [classes]);

  const summaryItems = [
    { label: "Tổng số lớp", value: statistics.total },
    { label: "Đang mở", value: statistics.open },
    { label: "Đã đóng", value: statistics.closed },
    { label: "Sinh viên enroll", value: statistics.students },
  ];

  return (
    <section className="summary" aria-label="Thống kê lớp học">
      {summaryItems.map((item) => (
        <div className="summary-item" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  );
}

export default Summary;

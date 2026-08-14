import { useMemo } from "react";
import "./Summary.css";

function Summary({ attendances }) {
  const statistics = useMemo(() => {
    const total = attendances.length;
    const present = attendances.filter(
      (attendance) => attendance.status === "PRESENT"
    ).length;
    const absent = attendances.filter(
      (attendance) => attendance.status === "ABSENT"
    ).length;
    const attendanceRate = total === 0 ? 0 : Math.round((present / total) * 100);

    return { total, present, absent, attendanceRate };
  }, [attendances]);

  const summaryItems = [
    { label: "Tổng số bản ghi", value: statistics.total },
    { label: "Có mặt", value: statistics.present },
    { label: "Vắng mặt", value: statistics.absent },
    { label: "Tỷ lệ đi học", value: `${statistics.attendanceRate}%` },
  ];

  return (
    <section className="summary" aria-label="Thống kê nhanh">
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

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

test("renders real attendance data and quick statistics", () => {
  render(<App />);

  expect(screen.getByText("Đỗ Anh Quân")).toBeInTheDocument();
  expect(screen.getByText("Ngô Quang Huy")).toBeInTheDocument();

  const summary = screen.getByRole("region", { name: "Thống kê nhanh" });
  expect(within(summary).getByText("10")).toBeInTheDocument();
  expect(within(summary).getByText("7")).toBeInTheDocument();
  expect(within(summary).getByText("3")).toBeInTheDocument();
  expect(within(summary).getByText("70%")).toBeInTheDocument();
});

test("searches with a ref, filters status, and resets filters", () => {
  render(<App />);

  const searchInput = screen.getByLabelText("Tìm kiếm sinh viên");
  fireEvent.change(searchInput, { target: { value: "do anh quan" } });
  expect(screen.getByText("Đỗ Anh Quân")).toBeInTheDocument();
  expect(screen.queryByText("Trần Ngọc Tùng")).not.toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Lọc theo trạng thái"), {
    target: { value: "ABSENT" },
  });
  expect(
    screen.getByText("Không tìm thấy bản ghi phù hợp.")
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Reset bộ lọc" }));
  expect(searchInput).toHaveValue("");
  expect(screen.getByText("Trần Ngọc Tùng")).toBeInTheDocument();
});

test("deletes an attendance and synchronizes it to localStorage", async () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "Xóa Đỗ Anh Quân" }));
  expect(screen.queryByText("Đỗ Anh Quân")).not.toBeInTheDocument();

  await waitFor(() => {
    const savedAttendances = JSON.parse(
      window.localStorage.getItem("lab2_3_attendances")
    );
    expect(savedAttendances).toHaveLength(9);
  });
});

import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { instance } from "./lib/axios";

jest.mock("./lib/axios", () => ({
  instance: {
    get: jest.fn(),
  },
}));

const activeAccount = {
  id: "acc_01",
  email: "student1@fpt.edu.vn",
  password: "123",
  fullName: "FullName Student",
  role: "Student",
  educationLevel: "FPTU - FPT University",
  status: "Active",
};

const subjects = [
  {
    id: "sub_01",
    code: "PRF192",
    name: "Programming Fundamentals",
    curriculum: "Software Engineering 2024",
    semester: 1,
    credits: 3,
    preRequisites: [],
    description: "Introduction to programming concepts using C language.",
  },
  {
    id: "sub_04",
    code: "FER202",
    name: "Front-End Frameworks",
    curriculum: "Software Engineering 2024",
    semester: 5,
    credits: 3,
    preRequisites: ["WEB201c"],
    description: "Building modern single-page applications using ReactJS framework.",
  },
];

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, "", "/");
  instance.get.mockReset();
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  window.alert.mockRestore();
});

test("redirects root, protected, and invalid paths to the login page", async () => {
  const { unmount } = render(<App />);
  expect(await screen.findByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe("/login");
  unmount();

  window.history.pushState({}, "", "/syllabus");
  const protectedPage = render(<App />);
  expect(await screen.findByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe("/login");
  protectedPage.unmount();

  window.history.pushState({}, "", "/does-not-exist");
  render(<App />);
  expect(await screen.findByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe("/login");
});

test("logs in, stores a safe session, searches, and opens subject details", async () => {
  instance.get.mockImplementation((url) => {
    if (url === "/accounts") return Promise.resolve({ data: [activeAccount] });
    if (url === "/subjects") return Promise.resolve({ data: subjects });
    return Promise.reject(new Error("Unexpected URL"));
  });

  render(<App />);
  fireEvent.change(await screen.findByPlaceholderText(/email of student or lecturer/i), {
    target: { value: activeAccount.email },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
    target: { value: activeAccount.password },
  });
  fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

  expect(await screen.findByText("Hello, FullName Student (Student)")).toBeInTheDocument();
  expect(window.location.pathname).toBe("/syllabus");
  expect(localStorage.getItem("fptLearningPortalUser")).not.toContain("password");

  expect(await screen.findByRole("link", { name: "PRF192" })).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Search by"), {
    target: { value: "name" },
  });
  fireEvent.change(screen.getByLabelText("Search subjects"), {
    target: { value: "Front-End" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Search" }));
  expect(screen.queryByRole("link", { name: "PRF192" })).not.toBeInTheDocument();

  fireEvent.click(screen.getByRole("link", { name: "FER202" }));
  expect(await screen.findByRole("heading", { name: "Front-End Frameworks" })).toBeInTheDocument();
  expect(window.location.pathname).toBe("/subject/sub_04");
});

test("strictly denies an inactive account and displays the locked alert", async () => {
  instance.get.mockResolvedValue({
    data: [{ ...activeAccount, status: "Inactive" }],
  });

  render(<App />);
  fireEvent.change(await screen.findByPlaceholderText(/email of student or lecturer/i), {
    target: { value: activeAccount.email },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
    target: { value: activeAccount.password },
  });
  fireEvent.click(screen.getByRole("button", { name: /^sign in$/i }));

  await waitFor(() =>
    expect(window.alert).toHaveBeenCalledWith("Tài khoản đã bị khóa")
  );
  expect(window.location.pathname).toBe("/login");
  expect(localStorage.getItem("fptLearningPortalUser")).toBeNull();
});

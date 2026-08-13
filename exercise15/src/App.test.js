import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("counter dispatches increment, decrement, and reset actions", () => {
  render(<App />);

  const readout = screen.getByText("Current count").nextElementSibling;
  fireEvent.click(screen.getByRole("button", { name: "Increment count" }));
  fireEvent.click(screen.getByRole("button", { name: "Increment count" }));
  expect(readout).toHaveTextContent("2");

  fireEvent.click(screen.getByRole("button", { name: "Decrement count" }));
  expect(readout).toHaveTextContent("1");

  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  expect(readout).toHaveTextContent("0");
});

test("question bank advances, scores answers, and restarts", () => {
  render(<App />);

  const answers = ["Canberra", "Mars", "useReducer", "dispatch"];

  answers.forEach((answer, index) => {
    fireEvent.click(screen.getByRole("radio", { name: answer }));
    fireEvent.click(
      screen.getByRole("button", {
        name: index === answers.length - 1 ? "Finish quiz" : "Next question",
      })
    );
  });

  expect(screen.getByText("Your score: 4/4")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Restart quiz" }));
  expect(
    screen.getByText("What is the capital of Australia?")
  ).toBeInTheDocument();
});

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("updates the counter, controlled input, and toggle", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "Increment" }));
  fireEvent.click(screen.getByRole("button", { name: "Increment" }));
  expect(screen.getByText("2")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("Type something"), {
    target: { value: "React state" },
  });
  expect(screen.getByText("React state")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Show" }));
  expect(screen.getByText("Toggle me!")).toBeInTheDocument();
});

test("adds and deletes a todo item", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("New todo"), {
    target: { value: "Write tests" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Add todo" }));
  expect(screen.getByText("Write tests")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Delete Write tests" }));
  expect(screen.queryByText("Write tests")).not.toBeInTheDocument();
});

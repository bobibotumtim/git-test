import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("toggles the shared theme", () => {
  render(<App />);

  expect(screen.getByText("light")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
  expect(screen.getByText("dark")).toBeInTheDocument();
});

test("updates cart count and value without refreshing", () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole("button", { name: "Add Uthappizza to cart" })
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Add Uthappizza to cart" })
  );

  expect(screen.getByLabelText("2 items in cart")).toBeInTheDocument();
  expect(screen.getByText("2 × $4.99")).toBeInTheDocument();
  expect(screen.getAllByText("$9.98").length).toBeGreaterThan(0);

  fireEvent.click(
    screen.getByRole("button", { name: "Remove Uthappizza from cart" })
  );
  expect(screen.getByLabelText("0 items in cart")).toBeInTheDocument();
});

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

test("counter increments from zero to one", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(<App />));
  const counter = [...container.querySelectorAll("section")].find((section) =>
    section.textContent.includes("Counter"),
  );
  const plusButton = [...counter.querySelectorAll("button")].find(
    (button) => button.textContent === "+",
  );
  act(() => plusButton.click());
  expect(counter.querySelector("strong").textContent).toBe("1");
  act(() => root.unmount());
  container.remove();
});

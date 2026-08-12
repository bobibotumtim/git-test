import React, { act } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

test("invalid form shows a warning", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(<App />));
  act(() =>
    container
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
  );
  expect(container.querySelector(".alert-warning").textContent).toContain(
    "Vui lòng nhập đúng thông tin",
  );
  act(() => root.unmount());
  container.remove();
});

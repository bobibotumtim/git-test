import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn((url) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            userId: Number(new URL(url).searchParams.get("userId")),
            id: 1,
            title: "A fetched post",
            body: "Post content",
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("refetches posts when the user ID changes", async () => {
  render(<App />);

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  fireEvent.change(screen.getByLabelText("User ID"), { target: { value: "2" } });

  await waitFor(() =>
    expect(global.fetch).toHaveBeenLastCalledWith(
      expect.stringContaining("userId=2"),
      expect.any(Object)
    )
  );
});

test("validates the username whenever its value changes", async () => {
  render(<App />);

  expect(await screen.findByText("A fetched post")).toBeInTheDocument();

  const input = screen.getByLabelText("Username");
  fireEvent.change(input, { target: { value: "abc" } });
  expect(
    screen.getByText("Username must contain at least 5 characters.")
  ).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "react" } });
  expect(
    screen.queryByText("Username must contain at least 5 characters.")
  ).not.toBeInTheDocument();
});

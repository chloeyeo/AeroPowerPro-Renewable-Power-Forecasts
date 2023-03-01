import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

class ResizeObserver {
  observe() {}
  unobserve() {}
}

describe("Login works", () => {
  window.ResizeObserver = ResizeObserver;
  render(
    <Router>
      <Login />
    </Router>
  );

  const inputPasswordNode = screen.getByText(/Password/i);
  const inputEmailNode = screen.getByText(/Email address/i);
  const submitButton = screen.getByRole("button", { name: /Submit/i });

  it("renders correct text", () => {
    // expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(inputEmailNode).toBeInTheDocument();
    expect(inputPasswordNode).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    // expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();

    // expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("does not allow login with not existing user credentials", () => {
    // the input text should be blank when
    // we put the non existent credentials then click submit

    // expect(inputPasswordNode).toBeTruthy();

    expect(inputEmailNode).toHaveTextContent(""); // empty before
    // expect(inputPasswordNode).toHaveValue(""); // empty before
    fireEvent.change(inputEmailNode, {
      target: { value: "nonexistent235@gmail.com" },
    });
    // fireEvent.change(inputPasswordNode, {
    //   target: { value: "235235nonexist" },
    // });
    fireEvent.click(screen.getByText("Submit"));
    expect(inputEmailNode).toHaveValue(""); // empty after
    // expect(inputPasswordNode).toHaveValue(""); // empty after
  });
});

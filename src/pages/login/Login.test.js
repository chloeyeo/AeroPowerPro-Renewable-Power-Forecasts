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

  it("renders correct text", () => {
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("does not allow login with not existing user credentials", () => {
    // the input text should be blank when
    // we put the non existent credentials then click submit
    const inputPasswordNode = screen.getByText("Password");
    const inputEmailNode = screen.getByText("Email address");
    expect(inputEmailNode.value).toBe(""); // empty before
    expect(inputPasswordNode.value).toBe(""); // empty before
    fireEvent.change(inputEmailNode, {
      target: { value: "nonexistent235@gmail.com" },
    });
    fireEvent.change(inputPasswordNode, {
      target: { value: "235235nonexist" },
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(inputEmailNode.value).toBe(""); // empty after
    expect(inputPasswordNode.value).toBe(""); // empty after
  });
});

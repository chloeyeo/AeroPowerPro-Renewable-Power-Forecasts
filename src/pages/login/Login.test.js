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
    const inputPasswordNode = document.getElementsByClassName(
      "exampleInputPassword1"
    )[0];
    const inputEmailNode =
      document.getElementsByClassName("exampleInputEmail1")[0];
    expect(inputPasswordNode).toBeTruthy();
    expect(inputEmailNode).toBeTruthy();
    expect(inputEmailNode).toHaveValue(""); // empty before
    expect(inputPasswordNode).toHaveValue(""); // empty before
    fireEvent.change(inputEmailNode, {
      target: { value: "nonexistent235@gmail.com" },
    });
    fireEvent.change(inputPasswordNode, {
      target: { value: "235235nonexist" },
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(inputEmailNode).toHaveValue(""); // empty after
    expect(inputPasswordNode).toHaveValue(""); // empty after
  });
});

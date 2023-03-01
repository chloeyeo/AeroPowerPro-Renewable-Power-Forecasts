import Register from "./Register";
import React from "react";
import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("registration not successful when all the fields are not entered", async () => {
  const registerForm = render(
    <Router>
      <Register />
    </Router>
  );
  const buttonElement =
    registerForm.container.querySelector("#register-button");
  await userEvent.click(buttonElement);
  expect(screen.getByText("Create an account")).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

class ResizeObserver {
  observe() {}
  unobserve() {}
}

it("renders correct text", () => {
  window.ResizeObserver = ResizeObserver;
  render(
    <Router>
      <Home />
    </Router>
  );
  expect(screen.getByText("Area Size Map")).toBeInTheDocument();
  expect(screen.getByText("Jethro's Power Forecasts")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Contact Us")).toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();
  expect(screen.getByText("Wind Power Forecast")).toBeInTheDocument();
  expect(screen.getByText("Collapse")).toBeInTheDocument();
});

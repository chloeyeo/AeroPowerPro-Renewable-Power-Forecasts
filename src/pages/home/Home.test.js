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
});

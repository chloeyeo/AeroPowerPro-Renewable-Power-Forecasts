import { render, screen } from "@testing-library/react";
import Register from "./Register";

describe("Register component", () => {
  it("should render Register component correctly", () => {
    render(<Register />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });
});

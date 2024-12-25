import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should have docs text", () => {
    render(<Home />); // ARRANGE

    const myElement = screen.getByText("Read our docs"); // ACT

    expect(myElement).toBeInTheDocument(); // ASSERT
  });
});

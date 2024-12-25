import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/components/Sidebar";

describe("Sidebar", () => {
  // it("should have logo rendered", () => {
  //   render(<Sidebar />);
  //   const logo = screen.getByAltText("Grinance logo");

  //   expect(logo).toBeInTheDocument();
  // });

  it("should have the sidebar collapsed", () => {
    render(<Sidebar />);
    const sidebar = screen.getByTestId("Grinance");
    expect(sidebar).toHaveClass("w-[70px]");
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Dashboard from "@/app/(auth)/dashboard/page";

describe("Dashboard", () => {
  it("should have the dashboard element", () => {
    render(<Dashboard />);
    const dashboardElement = screen.getByText("Dashboard");
    expect(dashboardElement).toBeInTheDocument();
  });
});

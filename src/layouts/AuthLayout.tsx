import { Outlet } from "react-router-dom";
import { LeftPaneTestimonials } from "../features/auth/components/LeftPaneTestimonials";

export function AuthLayout() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <LeftPaneTestimonials />
      <Outlet />
    </main>
  );
}

import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<DashboardHome />} />
      </Route>
    </Routes>
  );
};

export { AppRoutes };

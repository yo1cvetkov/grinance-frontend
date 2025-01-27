import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { Home } from "./pages/Home";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { authRouteLoader, protectedRouteLoader } from "./lib/loaders";
import { Pricing } from "./pages/Pricing";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { NewPassword } from "./pages/NewPassword";
import { SuccessResetPassword } from "./pages/SuccessResetPassword";
import { UserSettings } from "./pages/UserSettings";
import { AccountSettings } from "./pages/AccountSettings";
import { Budgets } from "./pages/Budgets";
import { AddBudget } from "./pages/AddBudget";
import { Transactions } from "./pages/Transactions";
import { AddTransaction } from "./pages/AddTransaction";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route element={<AuthLayout />} loader={authRouteLoader(queryClient)}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<SuccessResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Route>
      <Route path="/" element={<DashboardLayout />} loader={protectedRouteLoader(queryClient)}>
        <Route index path="dashboard" element={<DashboardHome />} />
        <Route path="dashboard/user-settings" element={<UserSettings />} />
        <Route path="dashboard/account-settings" element={<AccountSettings />} />
        <Route path="dashboard/budgets" element={<Budgets />} />
        <Route path="dashboard/budgets/add" element={<AddBudget />} />
        <Route path="dashboard/transactions" element={<Transactions />} />
        <Route path="dashboard/transactions/add" element={<AddTransaction />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <SnackbarProvider />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;

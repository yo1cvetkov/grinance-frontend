import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SnackbarProvider } from "notistack";
import { Home } from "./pages/Home";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { protectedRouteLoader } from "./lib/loaders";
import { Pricing } from "./pages/Pricing";
import { ForgotPassword } from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} loader={protectedRouteLoader(queryClient)} />
      <Route path="/pricing" element={<Pricing />} loader={protectedRouteLoader(queryClient)} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route element={<DashboardLayout />} loader={protectedRouteLoader(queryClient)}>
        <Route path="dashboard" element={<DashboardHome />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <SnackbarProvider />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;

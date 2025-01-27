import { fetchUser } from "@/features/auth/services/login.service";
import { QueryClient } from "@tanstack/react-query";
import { LoaderFunction, redirect } from "react-router-dom";

export const protectedRouteLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    try {
      const user = queryClient.getQueryData(["user"]);
      if (!user) {
        const data = await queryClient.fetchQuery({ queryKey: ["user"], queryFn: fetchUser });
        return data;
      }

      return user;
    } catch {
      const requestedUrl = new URL(request.url).pathname;

      return redirect(`/login?redirectTo=${encodeURIComponent(requestedUrl)}`);
    }
  };

export const authRouteLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    try {
      const user = queryClient.getQueryData(["user"]);

      if (user) {
        return redirect("/dashboard");
      }

      await queryClient.fetchQuery({ queryKey: ["user"], queryFn: fetchUser });

      return redirect("/dashboard");
    } catch {
      return null;
    }
  };

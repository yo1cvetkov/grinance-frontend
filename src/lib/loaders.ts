import { fetchUser } from "@/features/auth/services/login.service";
import { QueryClient } from "react-query";
import { LoaderFunction, redirect } from "react-router-dom";

export const protectedRouteLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    try {
      const user = queryClient.getQueryData(["user"]);
      if (!user) {
        const data = await queryClient.fetchQuery(["user"], fetchUser);
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

      await queryClient.fetchQuery(["user"], fetchUser);

      return redirect("/dashboard");
    } catch {
      return null;
    }
  };

export const accountSelectionLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async () => {
    const user = queryClient.getQueryData(["user"]);

    if (!user) {
      return redirect("/login");
    }

    // @ts-expect-error temp
    if (user.activeAccount) {
      return true;
    } else {
      return redirect("/select-account");
    }
  };

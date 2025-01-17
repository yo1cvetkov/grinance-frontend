import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { QueryClient } from "react-query";
import { redirect } from "react-router-dom";

export const protectedRouteLoader = (queryClient: QueryClient) => async () => {
  const user = queryClient.getQueryData(["user"]);

  // console.log("Sent this");
  // return { message: "This" };
  if (!user) {
    try {
      // const { data } = await axios.get("/auth/whoAmI");

      // user = data;

      const data = await queryClient.fetchQuery(
        ["user"],
        async () => {
          const { data } = await axios.get("/auth/whoAmI");

          return data;
        },
        {
          staleTime: 15 * 60 * 1000,
        }
      );

      return data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 403) {
        try {
          await axios.get("/auth/refresh");

          // const { data } = await axios.get("/auth/whoAmI");

          // user = data;

          const data = await queryClient.fetchQuery(
            ["user"],
            async () => {
              const { data } = await axios.get("/auth/whoAmI");

              return data;
            },
            {
              staleTime: 15 * 60 * 1000,
            }
          );

          // queryClient.setQueryData(["user"], user);

          return data;
        } catch {
          return redirect("/login");
        }
      } else {
        return redirect("/login");
      }
    }
  }

  return user;
};

import { useQuery, useQueryClient } from "react-query";
import { useLoaderData } from "react-router-dom";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

export function Home() {
  const loaderData = useLoaderData();

  const queryClient = useQueryClient();

  console.log(loaderData);

  const { data: user } = useQuery(
    ["user"],
    async () => {
      const { data } = await axios.get("/auth/whoAmI");
      return data;
    },
    {
      initialData: queryClient.getQueryData(["user"]),
      staleTime: 15 * 60 * 1000,
      onError: async (error) => {
        const err = error as AxiosError;

        if (err.response?.status === 403) {
          await axios.get("/auth/refresh");
          await axios.get("/auth/whoAmI");
        }
      },
    }
  );

  return (
    <section>
      <h1 className="text-2xl">Home Page</h1>
    </section>
  );
}

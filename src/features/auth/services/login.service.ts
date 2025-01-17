import axios from "@/lib/axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

const login = async (data: { username: string; password: string }) => await axios.post("/auth/login", data);

export const fetchUser = async () => {
  const res = await axios.get("/auth/whoAmI");
  return res.data;
};

export const useUser = () => {
  return useQuery(["user"], fetchUser, {
    staleTime: 15 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    retry: false,
  });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const href = searchParams.get("redirectTo") || "/dashboard";

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: () => {
      navigate(href, {
        viewTransition: true,
      });
    },
  });
};

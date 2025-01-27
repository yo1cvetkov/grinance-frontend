import axios from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginSchemaType } from "../schemas/login";
import { User } from "@/types/User";

const login = async (data: LoginSchemaType) => await axios.post("/auth/login", data);

export const fetchUser = async (): Promise<User> => {
  const res = await axios.get("/auth/whoAmI");
  return res.data;
};

export const useUser = () => {
  return useQuery({ queryKey: ["user"], queryFn: fetchUser, staleTime: 15 * 60 * 1000, retry: false });
};

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const href = searchParams.get("redirectTo") || "/dashboard";

  return useMutation({
    mutationFn: (data: LoginSchemaType) => login(data),
    onSuccess: () => {
      navigate(href, {
        viewTransition: true,
      });
    },
  });
};

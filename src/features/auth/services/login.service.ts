import axios from "@/lib/axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const login = async (data: { username: string; password: string }) => await axios.post("/auth/login", data);

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: () => {
      navigate("/", {
        viewTransition: true,
      });
    },
  });
};

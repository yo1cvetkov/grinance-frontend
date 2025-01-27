import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const logout = async () => await axios.post("/auth/logout");

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { viewTransition: true });
    },
  });
};

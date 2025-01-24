import { useMutation } from "react-query";
import { ResetPasswordSchemaType } from "../schemas/reset-password";
import axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const resetPassword = async (data: ResetPasswordSchemaType) => await axios.post("/auth/reset-password", data);

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordSchemaType) => resetPassword(data),
    onSuccess: () => {
      navigate("/success", { viewTransition: true });
    },
  });
};

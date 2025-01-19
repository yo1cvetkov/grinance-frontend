import axios from "@/lib/axios";
import { useMutation } from "react-query";
import { ForgotPasswordSchemaType } from "../schemas/forgot-password";
import { useNavigate } from "react-router-dom";

type ForgotPasswordResponse = {
  email: string;
  message: string;
};

const forgotPassword = async (data: ForgotPasswordSchemaType) => await axios.post("/auth/forget-password", data);

export const useForgotPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ForgotPasswordSchemaType) => forgotPassword(data).then((res) => res.data),
    onSuccess: (data: ForgotPasswordResponse) => {
      navigate(`/reset-password?email=${data.email}`, { viewTransition: true });
    },
  });
};

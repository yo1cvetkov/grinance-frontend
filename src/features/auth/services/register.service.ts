import { RegisterSchemaType } from "../schemas/register";
import axios from "@/lib/axios";
import { useMutation } from "react-query";

const register = async (data: RegisterSchemaType) => await axios.post("/auth/register", data);

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterSchemaType) => register(data),
  });
};

import axios from "@/lib/axios";

import { CreateAccountSchemaType } from "../schemas/create-account";
import { useMutation, useQueryClient } from "react-query";
import { enqueueSuccess } from "@/lib/snackbar";

const createAccount = async (data: CreateAccountSchemaType) => await axios.post("/accounts", data);

export const useCreateAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountSchemaType) => createAccount(data),
    onSuccess: () => {
      enqueueSuccess("Account created.");
      queryClient.invalidateQueries(["user"]);
    },
  });
};

import axios from "@/lib/axios";
import { EditAccountSchemaType } from "../schemas/edit-account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const editAccount = async ({ id, ...data }: EditAccountSchemaType) => await axios.put(`/accounts/${id}`, data);

export const useEditAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditAccountSchemaType) => editAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

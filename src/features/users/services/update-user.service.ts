import axios from "@/lib/axios";
import { UpdateUserSchemaType } from "../schema/update-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateUser = async ({ id, ...data }: UpdateUserSchemaType) => await axios.put(`/users/${id}`, data);

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserSchemaType) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

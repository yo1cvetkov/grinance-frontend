import axios from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const selectAccount = async (accountId: string) =>
  await axios.patch(`/users/active-account`, null, {
    params: {
      accountId,
    },
  });

export const useSelectAccountMutation = () => {
  return useMutation({
    mutationFn: (data: { id: string }) => selectAccount(data.id),
  });
};

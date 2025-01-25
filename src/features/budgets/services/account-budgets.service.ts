import axios from "@/lib/axios";
import { Budget } from "@/types/Budget";
import { useQuery } from "react-query";

const getAccountBudgets = async (accountId: string) => {
  const res = await axios.get(`/budgets/${accountId}`);
  return res.data;
};

export const useAccountBudgets = (accountId: string) => {
  return useQuery<Budget[]>(["budgets", accountId], () => getAccountBudgets(accountId), {
    staleTime: 15 * 60 * 1000,
  });
};

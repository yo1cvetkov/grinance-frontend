import axios from "@/lib/axios";
import { useQuery } from "react-query";

const getAllOneTimeTransactions = async (accountId: string, page?: number, limit?: string, budgetId?: string) =>
  await axios.get(`/transactions/one-time/${accountId}`, {
    params: {
      page,
      limit,
      budgetId,
    },
  });

export const useAllOneTimeTransactions = (accountId: string, page?: number, limit?: string, budgetId?: string) => {
  return useQuery(
    [
      "transactions",
      accountId,
      {
        page,
        limit,
        budgetId,
      },
    ],
    () => getAllOneTimeTransactions(accountId, page, limit, budgetId),
    {
      staleTime: 15 * 60 * 1000,
    }
  );
};

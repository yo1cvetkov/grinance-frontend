import axios from "@/lib/axios";
import { PaginatedTransactions } from "@/types/Transaction";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const getOneTimeTransactions = async (accountId: string, page?: number, limit?: string, budgetId?: string) => {
  const res = await axios.get(`/transactions/one-time/${accountId}`, {
    params: {
      page,
      limit,
      budgetId,
    },
  });

  return res.data;
};

export const useOneTimeTransactions = ({ accountId, budgetId, limit, page }: { accountId: string; page?: number; limit?: string; budgetId?: string }) => {
  return useQuery<PaginatedTransactions>({
    queryKey: [
      "transactions",
      accountId,
      {
        page,
        limit,
        budgetId,
      },
    ],
    queryFn: () => getOneTimeTransactions(accountId, page, limit, budgetId),
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};

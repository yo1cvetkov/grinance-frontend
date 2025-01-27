import axios from "@/lib/axios";
import { AddTransactionSchemaType } from "../schema/add-transaction";
import { useMutation } from "react-query";

const createTransaction = async (data: AddTransactionSchemaType) => await axios.post(`/transactions/one-time/`, data);

export const useCreateTransactionMutation = () => {
  return useMutation({
    mutationFn: (data: AddTransactionSchemaType) => createTransaction(data),
  });
};

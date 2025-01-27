import axios from "@/lib/axios";
import { AddBudgetSchemaType } from "../schema/add-budget";
import { useMutation } from "@tanstack/react-query";

const createBudget = async (data: AddBudgetSchemaType) => await axios.post("/budgets", data);

export const useCreateBudgetMutation = () => {
  return useMutation({
    mutationFn: (data: AddBudgetSchemaType) => createBudget(data),
  });
};

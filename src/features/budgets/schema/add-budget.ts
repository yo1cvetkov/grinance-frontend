import { z } from "zod";

export const addBudgetSchema = z.object({
  amount: z.number({ required_error: "Amount must be greater than 0" }).positive("Amount must be greater than 0"),
  description: z.string().min(1, "Description is required."),
  categoryId: z.string({ required_error: "Category must be selected." }).uuid("Category must be selected."),
  accountId: z.string({ required_error: "Account must be defined" }).uuid("Account must be defined."),
});

export type AddBudgetSchemaType = z.infer<typeof addBudgetSchema>;

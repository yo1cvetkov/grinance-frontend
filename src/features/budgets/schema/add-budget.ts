import { z } from "zod";

export const addBudgetSchema = z.object({
  amount: z.number({ required_error: "Amount must be greater than 0" }).positive("Amount must be greater than 0"),
  description: z.string(),
  categoryId: z.string().uuid(),
  accountId: z.string().uuid(),
});

export type AddBudgetSchemaType = z.infer<typeof addBudgetSchema>;

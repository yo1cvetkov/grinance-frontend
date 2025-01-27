import { TransactionType } from "@/types/TransactionType.enum";
import { z } from "zod";

export const addTransactionSchema = z.object({
  amount: z.string({ required_error: "Amount is required." }).transform(Number),
  description: z.string({ required_error: "Description is required" }).min(1, "Description is required"),
  accountId: z.string().uuid(),
  categoryId: z.string().uuid(),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
  transactionDate: z.date(),
});

export type AddTransactionSchemaType = z.infer<typeof addTransactionSchema>;

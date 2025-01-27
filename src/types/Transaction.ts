import { FullAccount } from "./Account";
import { Category } from "./Category";
import { TransactionType } from "./TransactionType.enum";

export type OneTimeTransaction = {
  id: string;
  amount: number;
  description: string;
  account: FullAccount;
  category: Category;
  createdAt: string;
  updatedAt: string;
  transactionType: TransactionType;
  transactionDate: string;
};

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
  type: TransactionType;
  transactionDate: string;
};

export type PaginatedTransactions = {
  transactions: OneTimeTransaction[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

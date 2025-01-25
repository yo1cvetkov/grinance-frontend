import { FullAccount } from "./Account";
import { Category } from "./Category";

export type Budget = {
  id: string;
  amount: number;
  description: string;
  account: FullAccount;
  category: Category;
  createdAt: string;
  updatedAt: string;
};

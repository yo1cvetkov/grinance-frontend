import { FullAccount } from "./Account";

export type User = {
  id: string;
  email: string;
  username: string;
  birthDate: string;
  name: string;
  accounts: FullAccount[];
  activeAccount: FullAccount | null;
};

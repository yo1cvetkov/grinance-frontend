import { Account } from "./Account";

export type User = {
  id: string;
  email: string;
  username: string;
  birthDate: string;
  name: string;
  accounts: Account[];
  activeAccount: string | null;
};

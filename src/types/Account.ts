import { Currency } from "./CurrencyEnum";

export type Account = {
  id: string;
  name: string;
};

export type FullAccount = {
  id: string;
  name: string;
  balance: number;
  currency: Currency;
};

import { Currency } from "@/types/CurrencyEnum";
import { z } from "zod";
import validator from "validator";

export const editAccountSchema = z.object({
  id: z.string().refine((value) => validator.isUUID(value)),
  name: z.string({ required_error: "Account name is required" }).min(1, "Account name is required"),
  balance: z.string().transform((value) => parseFloat(value)),
  currency: z.enum([Currency.EUR, Currency.USD]),
});

export type EditAccountSchemaType = z.infer<typeof editAccountSchema>;

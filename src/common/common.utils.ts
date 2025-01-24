import { z } from "zod";
import validator from "validator";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "@/types/CurrencyEnum";

export const passwordValidationSchema = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(8, `${fieldName} must contain at least 8 characters.`)
    .max(64, `${fieldName} must contain at most 64 characters.`)
    .refine(
      (value) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        }),
      "Password is too weak"
    );

export const isDateNotInFuture = (fieldName: string) =>
  z.string({ required_error: `${fieldName} is required.` }).refine(
    (value) => {
      const date = new Date(value);

      const today = new Date();

      return date <= today;
    },
    {
      message: "Date cannot be in the future.",
    }
  );

export const isAdultSchema = (fieldName: string) =>
  z.string({ required_error: `${fieldName} is required.` }).refine(
    (value) => {
      const date = new Date(value);
      const today = new Date();

      const age = today.getFullYear() - date.getFullYear();

      const hadBirthdayThisYear = today.getMonth() > date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

      return age > 18 || (age === 18 && hadBirthdayThisYear);
    },
    {
      message: "You must be at least 18 years old.",
    }
  );

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function declareCurrency(curr: Currency) {
  switch (curr) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    default:
      return "";
  }
}

import { z } from "zod";
import validator from "validator";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

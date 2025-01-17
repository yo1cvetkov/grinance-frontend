import { z } from "zod";
import validator from "validator";
import { passwordValidationSchema } from "@/common/common.utils";

export const resetPasswordSchema = z
  .object({
    email: z.string({ required_error: "Email is required" }).email("Email must be valid"),
    code: z
      .string({ required_error: "OTP is required" })
      .min(4, "OTP is invalid")
      .max(4, "OTP is invalid")
      .refine((value) => validator.isNumeric(value)),
    password: passwordValidationSchema("Password"),
    confirmPassword: passwordValidationSchema("Confirm password"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

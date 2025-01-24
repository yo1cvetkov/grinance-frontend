import { passwordValidationSchema } from "@/common/common.utils";
import { z } from "zod";

export const newPasswordSchema = z
  .object({
    password: passwordValidationSchema("Password"),
    confirmPassword: passwordValidationSchema("Confirm password"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;

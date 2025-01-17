import { passwordValidationSchema } from "@/common/common.utils";
import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string({ required_error: "Username is required." }).min(4, "Username must be at least 4 characters long."),
    email: z.string({ required_error: "Email is required." }).email("Email must be valid."),
    password: passwordValidationSchema("Password"),
    confirmPassword: passwordValidationSchema("Confirm password"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

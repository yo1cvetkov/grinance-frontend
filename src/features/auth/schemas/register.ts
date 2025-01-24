import { isAdultSchema, isDateNotInFuture, passwordValidationSchema } from "@/common/common.utils";
import { z } from "zod";

const birthDateValidation = isDateNotInFuture("Birth date").and(isAdultSchema("Birth date"));

export const registerSchema = z
  .object({
    username: z.string({ required_error: "Username is required." }).min(4, "Username must be at least 4 characters long."),
    email: z.string({ required_error: "Email is required." }).email("Email must be valid."),
    name: z.string({ required_error: "Name is required" }).min(2, "Name is required."),
    birthDate: birthDateValidation,
    password: passwordValidationSchema("Password"),
    confirmPassword: passwordValidationSchema("Confirm password"),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords must match.",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

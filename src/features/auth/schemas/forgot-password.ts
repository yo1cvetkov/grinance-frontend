import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email("Email must be valid."),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

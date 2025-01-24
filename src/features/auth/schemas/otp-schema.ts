import { z } from "zod";
import validator from "validator";

export const otpSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required" })
    .min(4, "Invalid OTP.")
    .max(4, "Invalid OTP.")
    .refine((value) => validator.isNumeric(value), { message: "OTP must be a number." }),
});

export type OtpSchemaType = z.infer<typeof otpSchema>;

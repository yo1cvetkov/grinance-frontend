import { z } from "zod";
import { passwordValidationSchema } from "../../../common/common.utils";

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required." }).min(1, "Username is required."),
  password: passwordValidationSchema("Password"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

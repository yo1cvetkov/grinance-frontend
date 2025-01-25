import { isAdultSchema, isDateNotInFuture } from "@/common/common.utils";
import { z } from "zod";

const birthDateValidation = isDateNotInFuture("Birth date").and(isAdultSchema("Birth date"));

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: "User Name is required" }),
  username: z.string({ required_error: "Username is required" }).min(1, "Username is required"),
  birthDate: birthDateValidation,
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

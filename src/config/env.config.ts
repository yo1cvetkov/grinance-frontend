import { z } from "zod";

export const envConfigSchema = z.object({
  VITE_API_URL: z.string().url(),
});

const env = envConfigSchema.parse(import.meta.env);

export default env;

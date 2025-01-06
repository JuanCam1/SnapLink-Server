import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().min(1).max(100),
})

export const env = envSchema.parse(Bun.env);
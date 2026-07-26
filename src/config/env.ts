import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  UPSTASH_REDIS_REST_URL: z.string().url("Invalid Upstash Redis REST URL"),
  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .min(1, "Upstash Redis Token is required"),
  CACHE_TTL_SECONDS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("300"),
  RATE_LIMIT_MAX_REQUESTS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("100"),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("900000"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

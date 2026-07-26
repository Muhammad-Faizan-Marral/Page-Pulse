import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";

const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  UPSTASH_REDIS_REST_URL: z
    .string()
    .min(1, "Upstash Redis REST URL is required")
    .default(isTest ? "https://mock-redis.upstash.io" : ""),

  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .min(1, "Upstash Redis Token is required")
    .default(isTest ? "mock-token-for-tests" : ""),

  CACHE_TTL_SECONDS: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "number" ? val : parseInt(val, 10)))
    .default(300),

  RATE_LIMIT_MAX_REQUESTS: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "number" ? val : parseInt(val, 10)))
    .default(100),

  RATE_LIMIT_WINDOW_MS: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "number" ? val : parseInt(val, 10)))
    .default(900000),
});

// Process environment with test fallback handling
const rawEnv = {
  ...process.env,
  UPSTASH_REDIS_REST_URL:
    process.env.UPSTASH_REDIS_REST_URL ||
    (isTest ? "https://mock-redis.upstash.io" : undefined),
  UPSTASH_REDIS_REST_TOKEN:
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    (isTest ? "mock-token-for-tests" : undefined),
};

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;

import { redis } from "../config/redis.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { AuditResult } from "./audit.service.js";

export class CacheService {
  private static PREFIX = "page-pulse:audit:";

  private static getKey(url: string): string {
    const normalizedUrl = url.trim().toLowerCase();
    return `${this.PREFIX}${Buffer.from(normalizedUrl).toString("base64")}`;
  }

  public static async get(url: string): Promise<AuditResult | null> {
    try {
      const key = this.getKey(url);
      const cachedData = await redis.get<AuditResult>(key);

      if (cachedData) {
        return cachedData;
      }
      return null;
    } catch (error) {
      logger.error({ error, message: "Redis GET operation failed" });
      return null; // Fallback to live fetch on cache failure
    }
  }

  public static async set(url: string, data: AuditResult): Promise<void> {
    try {
      const key = this.getKey(url);
      const ttl = env.CACHE_TTL_SECONDS;

      await redis.set(key, JSON.stringify(data), {
        ex: ttl,
      });
    } catch (error) {
      logger.error({ error, message: "Redis SET operation failed" });
    }
  }
}

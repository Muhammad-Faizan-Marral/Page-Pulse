import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // e.g., 15 minutes
  max: env.RATE_LIMIT_MAX_REQUESTS, // Max requests allowed per window
  standardHeaders: true, // Return rate limit info in headers (`RateLimit-*`)
  legacyHeaders: false,
  message: {
    status: 'error',
    code: 'TOO_MANY_REQUESTS',
    message: `Too many audit requests from this IP, please try again after ${Math.ceil(
      env.RATE_LIMIT_WINDOW_MS / 60000
    )} minutes.`,
  },
});
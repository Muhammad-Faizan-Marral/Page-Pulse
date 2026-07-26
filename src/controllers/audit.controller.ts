import { Response, NextFunction } from 'express';
import { AuditService } from '../services/audit.service.js';
import { CacheService } from '../services/cache.service.js';
import { CustomRequest } from '../middlewares/requestId.middleware.js';
import { logger } from '../utils/logger.js';

export class AuditController {
  public static async runAudit(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { url } = req.body;

      // 1. Check Redis Cache
      const cachedResult = await CacheService.get(url);

      if (cachedResult) {
        logger.info({
          requestId: req.id,
          action: 'AUDIT_CACHE_HIT',
          targetUrl: url,
        });

        res.status(200).json({
          status: 'success',
          cached: true,
          requestId: req.id,
          data: cachedResult,
        });
        return;
      }

      // 2. Perform fresh Audit on Cache Miss
      logger.info({
        requestId: req.id,
        action: 'AUDIT_CACHE_MISS',
        targetUrl: url,
      });

      const auditData = await AuditService.performAudit(url);

      // 3. Store result in Redis Cache
      await CacheService.set(url, auditData);

      logger.info({
        requestId: req.id,
        action: 'AUDIT_REQUEST_COMPLETED',
        targetUrl: url,
        statusCode: auditData.statusCode,
        responseTimeMs: auditData.responseTimeMs,
      });

      res.status(200).json({
        status: 'success',
        cached: false,
        requestId: req.id,
        data: auditData,
      });
    } catch (error) {
      next(error);
    }
  }
}
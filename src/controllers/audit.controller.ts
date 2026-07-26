import { Response, NextFunction } from 'express';
import { AuditService } from '../services/audit.service.js';
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

      logger.info({
        requestId: req.id,
        action: 'AUDIT_REQUEST_STARTED',
        targetUrl: url,
      });

      const auditData = await AuditService.performAudit(url);

      logger.info({
        requestId: req.id,
        action: 'AUDIT_REQUEST_COMPLETED',
        targetUrl: url,
        statusCode: auditData.statusCode,
        responseTimeMs: auditData.responseTimeMs,
      });

      res.status(200).json({
        status: 'success',
        requestId: req.id,
        data: auditData,
      });
    } catch (error) {
      next(error);
    }
  }
}
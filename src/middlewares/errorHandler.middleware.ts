import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';
import { CustomRequest } from './requestId.middleware.js';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: CustomRequest,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';

  logger.error({
    requestId: req.id,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    status: 'error',
    code: errorCode,
    message: statusCode === 500 ? 'Internal server error occurred' : err.message,
    requestId: req.id,
  });
};
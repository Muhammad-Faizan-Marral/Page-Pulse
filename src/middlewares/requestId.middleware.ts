import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export interface CustomRequest extends Request {
  id?: string;
}

export const requestIdMiddleware = ( req: CustomRequest, res: Response, next: NextFunction) => {
  const existingId = req.headers["x-request-id"] as string;
  const requestId = existingId || randomUUID();

  req.id = requestId;
  res.setHeader("X-Request-ID", requestId);

  next();
};

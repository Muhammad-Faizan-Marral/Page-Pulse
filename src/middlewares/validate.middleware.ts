import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";


export const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "error",
          code: "INVALID_INPUT",
          message: "Validation failed for request parameters",
          errors: error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      return next(error);
    }
  };
};

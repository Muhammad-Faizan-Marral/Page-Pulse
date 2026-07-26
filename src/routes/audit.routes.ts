import { Router } from "express";
import { AuditController } from "../controllers/audit.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { apiRateLimiter } from "../middlewares/rateLimiter.middleware.js";
import { auditUrlSchema } from "../schemas/audit.schema.js";

const router = Router();

router.post("/audit",apiRateLimiter,validate(auditUrlSchema),AuditController.runAudit,);

export default router;

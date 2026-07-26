import express from 'express';
import cors from 'cors';
import { requestIdMiddleware } from './middlewares/requestId.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import auditRoutes from './routes/audit.routes.js';

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cors());
app.use(requestIdMiddleware);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', auditRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
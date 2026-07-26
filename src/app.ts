import express from 'express';
import cors from 'cors';
import { requestIdMiddleware } from './middlewares/requestId.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(requestIdMiddleware);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export default app;
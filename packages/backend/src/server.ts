import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { router } from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';
import { swaggerSpec } from './utils/swagger.js';

export async function createServer() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/healthz', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', router);
  app.use(errorHandler);

  return app;
}

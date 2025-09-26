import { Router } from 'express';

import { authenticate } from '../middleware/auth.js';
import { getAnalyticsHandler } from '../controllers/analytics.controller.js';

export const analyticsRouter = Router();

analyticsRouter.get('/', authenticate('ADMIN', 'DOCTOR'), getAnalyticsHandler);

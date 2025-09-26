import { Router } from 'express';

import { authRouter } from './auth.routes.js';
import { appointmentRouter } from './appointments.routes.js';
import { queueRouter } from './queue.routes.js';
import { doctorRouter } from './doctor.routes.js';
import { notificationRouter } from './notifications.routes.js';
import { analyticsRouter } from './analytics.routes.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/appointments', appointmentRouter);
router.use('/queue', queueRouter);
router.use('/doctors', doctorRouter);
router.use('/notifications', notificationRouter);
router.use('/analytics', analyticsRouter);

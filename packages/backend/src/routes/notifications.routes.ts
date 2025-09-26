import { Router } from 'express';

import { authenticate } from '../middleware/auth.js';
import {
  listNotificationsHandler,
  markNotificationReadHandler,
  createNotificationHandler
} from '../controllers/notifications.controller.js';

export const notificationRouter = Router();

notificationRouter.get('/', authenticate('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'), listNotificationsHandler);
notificationRouter.post('/', authenticate('ADMIN', 'NURSE'), createNotificationHandler);
notificationRouter.post('/:id/read', authenticate('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'), markNotificationReadHandler);

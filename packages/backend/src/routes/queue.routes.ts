import { Router } from 'express';

import { authenticate } from '../middleware/auth.js';
import {
  getQueueSummaryHandler,
  advanceQueueHandler,
  createQueueEntryHandler,
  listQueueEntriesHandler
} from '../controllers/queue.controller.js';

export const queueRouter = Router();

queueRouter.get('/', authenticate('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'), listQueueEntriesHandler);
queueRouter.get('/summary', authenticate('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'), getQueueSummaryHandler);
queueRouter.post('/', authenticate('NURSE', 'ADMIN'), createQueueEntryHandler);
queueRouter.post('/advance', authenticate('DOCTOR', 'NURSE', 'ADMIN'), advanceQueueHandler);

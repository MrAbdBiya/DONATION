import { Router } from 'express';

import { authenticate } from '../middleware/auth.js';
import {
  listDoctorsHandler,
  updateScheduleHandler,
  listSchedulesHandler
} from '../controllers/doctor.controller.js';

export const doctorRouter = Router();

doctorRouter.get('/', authenticate('PATIENT', 'ADMIN', 'NURSE', 'DOCTOR'), listDoctorsHandler);
doctorRouter.get('/schedules', authenticate('DOCTOR', 'NURSE', 'ADMIN'), listSchedulesHandler);
doctorRouter.put('/schedules/:id', authenticate('DOCTOR'), updateScheduleHandler);

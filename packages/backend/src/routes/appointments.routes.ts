import { Router } from 'express';

import {
  listAppointmentsHandler,
  createAppointmentHandler,
  updateAppointmentStatusHandler,
  rescheduleAppointmentHandler,
  cancelAppointmentHandler
} from '../controllers/appointments.controller.js';
import { authenticate } from '../middleware/auth.js';

export const appointmentRouter = Router();

appointmentRouter.get('/', authenticate('PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'), listAppointmentsHandler);
appointmentRouter.post('/', authenticate('PATIENT'), createAppointmentHandler);
appointmentRouter.patch('/:id/status', authenticate('DOCTOR', 'NURSE', 'ADMIN'), updateAppointmentStatusHandler);
appointmentRouter.patch('/:id/reschedule', authenticate('PATIENT', 'DOCTOR'), rescheduleAppointmentHandler);
appointmentRouter.delete('/:id', authenticate('PATIENT', 'ADMIN'), cancelAppointmentHandler);

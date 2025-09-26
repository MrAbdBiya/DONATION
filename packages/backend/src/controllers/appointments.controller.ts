import Boom from '@hapi/boom';
import type { Request, Response } from 'express';
import { addMinutes, differenceInMinutes } from 'date-fns';
import { z } from 'zod';

import { prisma } from '../utils/prisma.js';

const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(10)
});

export async function listAppointmentsHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const { page, pageSize } = paginationSchema.parse(req.query);
  const skip = (page - 1) * pageSize;

  const where =
    req.user.role === 'PATIENT'
      ? { patient: { userId: req.user.sub } }
      : req.user.role === 'DOCTOR'
        ? { doctor: { userId: req.user.sub } }
        : {};

  const [data, total] = await Promise.all([
    prisma.appointment.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { scheduledDate: 'asc' },
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        queueEntry: true
      }
    }),
    prisma.appointment.count({ where })
  ]);

  res.json({ data, total, page, pageSize });
}

const createAppointmentSchema = z.object({
  doctorId: z.string().uuid(),
  scheduledDate: z.string().transform((value) => new Date(value)),
  reason: z.string().optional()
});

export async function createAppointmentHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const body = createAppointmentSchema.parse(req.body);

  const patient = await prisma.patient.findFirst({ where: { userId: req.user.sub } });
  if (!patient) {
    throw Boom.notFound('Patient profile not found');
  }

  const appointment = await prisma.appointment.create({
    data: {
      doctorId: body.doctorId,
      patientId: patient.id,
      scheduledDate: body.scheduledDate,
      reason: body.reason
    }
  });

  res.status(201).json(appointment);
}

const statusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
});

export async function updateAppointmentStatusHandler(req: Request, res: Response) {
  const { status } = statusSchema.parse(req.body);
  const id = z.string().uuid().parse(req.params.id);

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status }
  });

  res.json(appointment);
}

const rescheduleSchema = z.object({
  scheduledDate: z.string().transform((value) => new Date(value))
});

export async function rescheduleAppointmentHandler(req: Request, res: Response) {
  const id = z.string().uuid().parse(req.params.id);
  const body = rescheduleSchema.parse(req.body);

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { scheduledDate: body.scheduledDate, status: 'CONFIRMED' }
  });

  res.json(appointment);
}

export async function cancelAppointmentHandler(req: Request, res: Response) {
  const id = z.string().uuid().parse(req.params.id);

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status: 'CANCELLED' }
  });

  res.json(appointment);
}

export function estimateWaitTime(queuePosition: number, averageMinutes = 15) {
  return addMinutes(new Date(), queuePosition * averageMinutes);
}

export function getWaitDuration(queueEntryCreatedAt: Date, now = new Date()) {
  return differenceInMinutes(now, queueEntryCreatedAt);
}

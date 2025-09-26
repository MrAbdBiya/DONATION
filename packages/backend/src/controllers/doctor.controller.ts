import Boom from '@hapi/boom';
import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../utils/prisma.js';

export async function listDoctorsHandler(_req: Request, res: Response) {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      schedules: {
        orderBy: { date: 'asc' },
        take: 5
      }
    }
  });

  res.json(doctors);
}

export async function listSchedulesHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const doctor = await prisma.doctor.findFirst({ where: { userId: req.user.sub } });
  if (!doctor) {
    throw Boom.notFound('Doctor profile not found');
  }

  const schedules = await prisma.schedule.findMany({
    where: { doctorId: doctor.id },
    orderBy: { date: 'asc' }
  });

  res.json(schedules);
}

const updateScheduleSchema = z.object({
  workingSlots: z.array(z.string()),
  blockedSlots: z.array(z.string())
});

export async function updateScheduleHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const id = z.string().uuid().parse(req.params.id);
  const body = updateScheduleSchema.parse(req.body);

  const doctor = await prisma.doctor.findFirst({ where: { userId: req.user.sub } });
  if (!doctor) {
    throw Boom.notFound('Doctor profile not found');
  }

  const schedule = await prisma.schedule.update({
    where: { id, doctorId: doctor.id },
    data: {
      workingSlots: body.workingSlots,
      blockedSlots: body.blockedSlots
    }
  });

  res.json(schedule);
}

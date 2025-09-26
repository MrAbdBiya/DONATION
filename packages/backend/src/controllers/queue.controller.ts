import Boom from '@hapi/boom';
import type { Request, Response } from 'express';
import { addMinutes } from 'date-fns';
import { z } from 'zod';

import { prisma } from '../utils/prisma.js';

export async function getQueueSummaryHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const activeEntry = await prisma.queueEntry.findFirst({
    where: { status: { in: ['WAITING', 'CALLED', 'IN_PROGRESS'] } },
    orderBy: { queueNumber: 'asc' },
    include: {
      appointment: {
        include: {
          patient: { include: { user: true } }
        }
      }
    }
  });

  const upcomingCount = await prisma.queueEntry.count({
    where: {
      status: 'WAITING',
      queueNumber: activeEntry?.queueNumber ? { gt: activeEntry.queueNumber } : undefined
    }
  });

  res.json({
    activeQueueNumber: activeEntry?.queueNumber ?? null,
    estimatedWaitMinutes: upcomingCount * 12,
    patientsAhead: upcomingCount,
    activePatient: activeEntry?.appointment.patient.user
  });
}

export async function listQueueEntriesHandler(_req: Request, res: Response) {
  const entries = await prisma.queueEntry.findMany({
    include: {
      appointment: {
        include: {
          patient: { include: { user: true } },
          doctor: { include: { user: true } }
        }
      }
    },
    orderBy: { queueNumber: 'asc' }
  });

  res.json({ data: entries });
}

const createSchema = z.object({
  appointmentId: z.string().uuid(),
  queueNumber: z.number().int().positive(),
  estimatedTime: z.number().int().positive().default(15)
});

export async function createQueueEntryHandler(req: Request, res: Response) {
  const body = createSchema.parse(req.body);

  const entry = await prisma.queueEntry.create({
    data: {
      appointmentId: body.appointmentId,
      queueNumber: body.queueNumber,
      estimatedTime: body.estimatedTime
    },
    include: {
      appointment: {
        include: {
          patient: { include: { user: true } }
        }
      }
    }
  });

  res.status(201).json(entry);
}

const advanceSchema = z.object({
  appointmentId: z.string().uuid().optional(),
  action: z.enum(['CALL_NEXT', 'SKIP', 'COMPLETE']).default('CALL_NEXT')
});

export async function advanceQueueHandler(req: Request, res: Response) {
  const body = advanceSchema.parse(req.body);

  const nextEntry = await prisma.queueEntry.findFirst({
    where: { status: 'WAITING' },
    orderBy: { queueNumber: 'asc' }
  });

  if (!nextEntry) {
    return res.json({ message: 'Queue is empty' });
  }

  const update = await prisma.queueEntry.update({
    where: { id: nextEntry.id },
    data: {
      status: body.action === 'COMPLETE' ? 'DONE' : body.action === 'SKIP' ? 'SKIPPED' : 'CALLED',
      estimatedTime: body.action === 'CALL_NEXT' ? 0 : nextEntry.estimatedTime,
      appointment: body.appointmentId
        ? {
            update: {
              status: body.action === 'COMPLETE' ? 'COMPLETED' : 'IN_PROGRESS'
            }
          }
        : undefined
    },
    include: {
      appointment: {
        include: {
          patient: { include: { user: true } }
        }
      }
    }
  });

  const upcoming = await prisma.queueEntry.findMany({
    where: { status: 'WAITING', queueNumber: { gt: update.queueNumber } },
    orderBy: { queueNumber: 'asc' },
    take: 5
  });

  const projections = upcoming.map((entry, index) => ({
    queueNumber: entry.queueNumber,
    eta: addMinutes(new Date(), (index + 1) * entry.estimatedTime)
  }));

  res.json({ active: update, upcoming: projections });
}

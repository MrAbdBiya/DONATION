import type { Request, Response } from 'express';
import { startOfDay, endOfDay, differenceInMinutes } from 'date-fns';

import { prisma } from '../utils/prisma.js';

export async function getAnalyticsHandler(_req: Request, res: Response) {
  const today = new Date();

  const [appointmentsToday, completedAppointments, prescriptionsIssued, queueEntries] =
    await Promise.all([
      prisma.appointment.count({
        where: {
          scheduledDate: {
            gte: startOfDay(today),
            lte: endOfDay(today)
          }
        }
      }),
      prisma.appointment.findMany({ where: { status: 'COMPLETED' } }),
      prisma.prescription.count(),
      prisma.queueEntry.findMany({ where: { status: { in: ['DONE', 'IN_PROGRESS'] } } })
    ]);

  const averageWaitMinutes =
    queueEntries.length === 0
      ? 0
      : Math.round(
          queueEntries.reduce(
            (acc, entry) => acc + differenceInMinutes(new Date(), entry.createdAt),
            0
          ) / queueEntries.length
        );

  const occupancyRate = appointmentsToday === 0 ? 0 : Math.min(100, appointmentsToday * 5);

  res.json({
    appointmentsToday,
    averageWaitMinutes,
    prescriptionsIssued,
    occupancyRate
  });
}

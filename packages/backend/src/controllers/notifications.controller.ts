import Boom from '@hapi/boom';
import type { Request, Response } from 'express';
import { z } from 'zod';

import { prisma } from '../utils/prisma.js';

export async function listNotificationsHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.sub },
    orderBy: { sentAt: 'desc' },
    take: 50
  });

  res.json(notifications);
}

const createSchema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1),
  message: z.string().min(1),
  type: z.enum(['APPOINTMENT', 'QUEUE', 'PRESCRIPTION', 'SYSTEM'])
});

export async function createNotificationHandler(req: Request, res: Response) {
  const body = createSchema.parse(req.body);

  const notification = await prisma.notification.create({
    data: {
      userId: body.userId,
      title: body.title,
      message: body.message,
      type: body.type
    }
  });

  res.status(201).json(notification);
}

export async function markNotificationReadHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const id = z.string().uuid().parse(req.params.id);

  const notification = await prisma.notification.update({
    where: { id, userId: req.user.sub },
    data: { isRead: true }
  });

  res.json(notification);
}

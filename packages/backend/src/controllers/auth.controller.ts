import Boom from '@hapi/boom';
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { prisma } from '../utils/prisma.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['PATIENT', 'DOCTOR', 'NURSE', 'ADMIN']),
  phone: z.string().optional()
});

export async function registerHandler(req: Request, res: Response) {
  const body = registerSchema.parse(req.body);

  const existingUser = await prisma.user.findUnique({ where: { email: body.email } });
  if (existingUser) {
    throw Boom.conflict('Email already exists');
  }

  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = await prisma.user.create({
    data: {
      email: body.email,
      passwordHash,
      firstName: body.firstName,
      lastName: body.lastName,
      role: body.role,
      phone: body.phone
    }
  });

  if (body.role === 'PATIENT') {
    await prisma.patient.create({
      data: {
        userId: user.id,
        dateOfBirth: new Date(),
        address: null,
        bloodType: null,
        allergies: []
      }
    });
  }

  if (body.role === 'DOCTOR') {
    await prisma.doctor.create({
      data: {
        userId: user.id,
        licenseNumber: `TEMP-${user.id.slice(0, 5).toUpperCase()}`,
        specializations: []
      }
    });
  }

  res.status(201).json({ id: user.id, email: user.email, role: user.role });
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function loginHandler(req: Request, res: Response) {
  const body = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user) {
    throw Boom.unauthorized('Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(body.password, user.passwordHash);
  if (!passwordMatch) {
    throw Boom.unauthorized('Invalid credentials');
  }

  const accessToken = signAccessToken({ sub: user.id, role: user.role });
  const refreshToken = signRefreshToken({ sub: user.id, role: user.role });

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(jwt.decode(refreshToken, { json: true })?.exp! * 1000)
    }
  });

  res.json({
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName
    }
  });
}

const refreshSchema = z.object({
  refreshToken: z.string()
});

export async function refreshHandler(req: Request, res: Response) {
  const body = refreshSchema.parse(req.body);

  const payload = jwt.verify(body.refreshToken, process.env.REFRESH_TOKEN_SECRET ?? 'change-me-refresh') as {
    sub: string;
    role: string;
  };

  const stored = await prisma.refreshToken.findUnique({ where: { token: body.refreshToken } });
  if (!stored || stored.expiresAt < new Date()) {
    throw Boom.unauthorized('Refresh token expired');
  }

  const accessToken = signAccessToken({ sub: payload.sub, role: payload.role });
  const newRefreshToken = signRefreshToken({ sub: payload.sub, role: payload.role });

  await prisma.refreshToken.delete({ where: { token: body.refreshToken } });
  await prisma.refreshToken.create({
    data: {
      userId: payload.sub,
      token: newRefreshToken,
      expiresAt: new Date(jwt.decode(newRefreshToken, { json: true })?.exp! * 1000)
    }
  });

  res.json({ accessToken, refreshToken: newRefreshToken });
}

export async function meHandler(req: Request, res: Response) {
  if (!req.user) {
    throw Boom.unauthorized('Missing user context');
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.sub } });
  if (!user) {
    throw Boom.notFound('User not found');
  }

  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName
  });
}

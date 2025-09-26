import Boom from '@hapi/boom';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import type { UserRole } from '@mediqueuepro/types';

interface TokenPayload {
  sub: string;
  role: UserRole;
}

export function authenticate(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
      return next(Boom.unauthorized('Missing Authorization header'));
    }

    const [, token] = header.split(' ');
    if (!token) {
      return next(Boom.unauthorized('Invalid Authorization header format'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'change-me') as TokenPayload;
      req.user = decoded;

      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return next(Boom.forbidden('Insufficient permissions'));
      }

      return next();
    } catch (error) {
      return next(Boom.unauthorized('Invalid or expired token', error));
    }
  };
}

import type { UserRole } from '@mediqueuepro/types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        role: UserRole;
      };
    }
  }
}

export {};

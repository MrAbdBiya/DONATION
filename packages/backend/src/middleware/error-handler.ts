import Boom from '@hapi/boom';
import type { NextFunction, Request, Response } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const boomError = Boom.isBoom(err) ? err : Boom.internal('Unexpected error', err);
  const { output } = boomError;

  res.status(output.statusCode).json({
    statusCode: output.statusCode,
    error: output.payload.error,
    message: output.payload.message,
    ...(boomError.data ? { data: boomError.data } : {})
  });
}

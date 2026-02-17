import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { config } from '../config';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation failed', errors: (err as Error & { errors?: unknown }).errors });
  }

  res.status(500).json({
    message: config.nodeEnv === 'production' ? 'Internal server error' : err.message,
  });
}

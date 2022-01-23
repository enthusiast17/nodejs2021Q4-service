import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from './config';
import { NOT_FOUND_ARGS, UNAUTHORIZED_ARGS } from './constants';
import { HttpError } from './error';
import { logger } from './logger';

export const handleRequestLogMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.log('info', { method: req.method, query: req.query, body: req.body });
  next();
};

export const handleErrorMiddleware = async (
  err: Error | HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (!(err instanceof HttpError)) {
    logger.log('error', { statusCode: 500, ...err });
    return res.status(500).json('Internal Error');
  }
  logger.log('error', err);
  return res.status(err.statusCode).json(err);
};

export const handleNotFoundMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new HttpError(...NOT_FOUND_ARGS, ''));
};

export const handleAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    verify(req.headers.authorization || '', config.JWT_SECRET_KEY as string);
    next();
  } catch (err: unknown) {
    next(new HttpError(...UNAUTHORIZED_ARGS, ''));
  }
};

import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../utils/errors';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    throw new RequestValidationError(errs.array());
  }

  next();
};

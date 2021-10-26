import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const taskCreateValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
): Promise<Response | void> => {
  await check('title', 'Title is invalid.').isString().run(req);
  await check('description', 'Title is invalid.').isString().run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send(errors.array());
  }

  return next();
};

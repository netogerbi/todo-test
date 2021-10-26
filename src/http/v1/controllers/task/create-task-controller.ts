import { Request, Response } from 'express';
import { createTaskService } from '../../../../domain/v1/task/services';
import { AppError } from '../../../../utils';
import logger from '../../../../config/logger';

export const createTaskController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, description } = req.body;
    const userId = req.user;

    const taskInserted = await createTaskService({
      title,
      description,
      userId,
    });

    return res.status(201).send(taskInserted);
  } catch (err) {
    logger.error(err);
    const error = err as AppError;
    return res.status(error.status || 500).send(error.message);
  }
};

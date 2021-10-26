import { Request, Response } from 'express';
import { createTaskService } from '../../../../domain/v1/task/services';

export const createTaskController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { title, description } = req.body;
  const userId = req.user;

  const taskInserted = await createTaskService({
    title,
    description,
    userId,
  });

  return res.status(201).send(taskInserted);
};

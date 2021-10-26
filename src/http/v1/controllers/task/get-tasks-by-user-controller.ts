import { Request, Response } from 'express';
import { findTaskByUser } from '../../../../domain/v1/task/services/find-task-by-user-service';

export const getTasksByUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.user.id;

  const tasksFound = await findTaskByUser(userId);

  return res.status(200).send(tasksFound);
};

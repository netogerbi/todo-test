import { Request, Response } from 'express';
import { Task } from '../../../../domain/v1/task/model';
import { updateTaskService } from '../../../../domain/v1/task/services';

export const updateTaskStatusController = async (
  req: Request<Pick<Task, 'id' | 'status'>>,
  res: Response
): Promise<Response> => {
  const { id, status } = req.params;

  const taskInserted = await updateTaskService({ id, status });

  return res.status(200).send(taskInserted);
};

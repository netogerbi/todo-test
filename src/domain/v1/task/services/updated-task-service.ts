import { NotFoundError, NotAuthorizedError } from '../../../../utils/errors';
import { TaskUpdateDTO } from '../dto';
import { Task } from '../model';
import * as TaskRepository from '../repository';

export const updateTaskService = async (
  taskChanged: TaskUpdateDTO
): Promise<Task> => {
  const taskFound = await TaskRepository.findById(taskChanged.id);

  if (!taskFound) {
    throw new NotFoundError();
  }

  if (taskFound?.userId !== taskChanged.userId) {
    throw new NotAuthorizedError();
  }

  return await TaskRepository.updateOne({
    ...taskFound,
    ...taskChanged,
  });
};

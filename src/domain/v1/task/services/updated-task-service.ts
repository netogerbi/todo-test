import { NotFoundError } from '../../../../utils/errors';
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

  return await TaskRepository.updateOne({
    ...taskFound,
    ...taskChanged,
  });
};

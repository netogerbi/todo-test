import { TaskCreateDTO } from '../dto';
import { Task } from '../model';
import { create } from '../repository';

export const createTaskService = async (
  newTask: TaskCreateDTO
): Promise<Task> => {
  return await create(newTask);
};

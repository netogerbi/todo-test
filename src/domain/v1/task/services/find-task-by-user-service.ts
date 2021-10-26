import { Task } from '../model';
import { findByUser } from '../repository';

export const findTaskByUser = async (userId: string): Promise<Task[]> => {
  return await findByUser(userId);
};

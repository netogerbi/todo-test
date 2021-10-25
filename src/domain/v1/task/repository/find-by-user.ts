import { MongoHelper } from '../../../../infra/db';
import { Task } from '../model';

export const findByUser = async (userId: string): Promise<Task[]> => {
  const collection = await MongoHelper.getCollection('tasks');
  const tasksFound = await collection.find({ userId });
  return MongoHelper.mapCollection<Task>(await tasksFound.toArray());
};

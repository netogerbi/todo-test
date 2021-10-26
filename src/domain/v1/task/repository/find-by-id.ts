import { ObjectId } from 'bson';
import { MongoHelper } from '../../../../infra/db';
import { Task } from '../model';

export const findById = async (id: string): Promise<Task | null> => {
  const col = await MongoHelper.getCollection('tasks');
  const taskFound = await col.findOne(new ObjectId(id));

  return !taskFound ? null : MongoHelper.map<Task>(taskFound);
};

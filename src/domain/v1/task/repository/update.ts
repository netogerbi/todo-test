import { ObjectId } from 'mongodb';
import { MongoHelper } from '../../../../infra/db';
import { TaskUpdateDTO } from '../dto';
import { Task } from '../model';

export const updateOne = async (taskChanges: TaskUpdateDTO): Promise<Task> => {
  const collection = await MongoHelper.getCollection('tasks');

  await collection.findOneAndUpdate(
    { _id: new ObjectId(taskChanges.id) },
    { $set: { ...taskChanges } }
  );

  return MongoHelper.map<Task>({ ...taskChanges, _id: taskChanges.id });
};

import { MongoHelper } from '../../../../infra/db';
import { TaskCreateDTO } from '../dto/task-create-dto';
import { Task, TaskState } from '../model';

export const create = async (newTask: TaskCreateDTO): Promise<Task> => {
  const collection = await MongoHelper.getCollection('tasks');

  const initalStateTask = {
    ...newTask,
    status: TaskState.TODO,
  };

  const taskCreated = await collection.insertOne(initalStateTask);

  return MongoHelper.map<Task>({
    ...initalStateTask,
    _id: taskCreated.insertedId,
  });
};

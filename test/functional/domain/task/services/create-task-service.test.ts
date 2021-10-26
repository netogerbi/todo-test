import { MongoHelper } from '../../../../../src/infra/db';
import { Collection } from 'mongodb';

import { TaskState } from '../../../../../src/domain/v1/task/model';
import { TaskCreateDTO } from '../../../../../src/domain/v1/task/dto/task-create-dto';
import { createTaskService } from '../../../../../src/domain/v1/task/services';

describe('TaskServices.createTaskService', () => {
  const task: TaskCreateDTO = {
    description: 'Create a test application',
    title: 'Test app',
    userId: 'asdasd',
  };

  let col: Collection;
  beforeEach(async () => {
    col = await MongoHelper.getCollection('tasks');
  });

  afterEach(async () => {
    const col = await MongoHelper.getCollection('tasks');
    col.deleteMany({});
  });

  it('should create new task', async () => {
    const r = await createTaskService(task);

    const taskSaved = await col.findOne({ _id: r.id });

    expect(r.id).toBeDefined();
    expect(r.description).toBe(taskSaved?.description);
    expect(r.title).toBe(taskSaved?.title);
    expect(r.userId).toBe(taskSaved?.userId);
    expect(r.status).toBe(TaskState.TODO);
  });
});

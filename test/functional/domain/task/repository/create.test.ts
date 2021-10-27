import { MongoHelper } from '../../../../../src/infra/db';
import { Collection } from 'mongodb';

import { TaskState } from '../../../../../src/domain/v1/task/model';
import { create } from '../../../../../src/domain/v1/task/repository/create';

describe('TaskRepository.create', () => {
  const task = {
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

  it('should insert new task', async () => {
    const r = await create(task);

    const taskSaved = await col.findOne({ _id: r.id });

    expect(r.id).toBeDefined();
    expect(r.description).toBe(taskSaved?.description);
    expect(r.title).toBe(taskSaved?.title);
    expect(r.userId).toBe(taskSaved?.userId);
    expect(r.status).toBe(TaskState.TODO);
  });
});

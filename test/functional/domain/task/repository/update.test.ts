/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Collection } from 'mongodb';
import { MongoHelper } from '../../../../../src/infra/db';
import { updateOne } from '../../../../../src/domain/v1/task/repository';
import { TaskState } from '../../../../../src/domain/v1/task/model';

describe('TaskRepository.updateOne', () => {
  const tasks = [
    {
      description: 'Create a test application',
      title: 'Test app x',
      userId: 'asdasd',
      status: TaskState.TODO,
    },
  ];

  let col: Collection;
  let inserted: any;
  beforeEach(async () => {
    col = await MongoHelper.getCollection('tasks');
    inserted = await col.insertMany(tasks);
  });

  afterEach(async () => {
    await col.deleteMany({});
  });

  it('should update task', async () => {
    const r = await updateOne({
      id: inserted.insertdIds,
      status: TaskState.ARCHIVED,
      userId: 'asdasd',
    });

    const updated = await col.findOne(inserted.insertdIds);

    expect(r).toEqual(
      expect.objectContaining({
        id: inserted.insertdIds,
        status: TaskState.ARCHIVED,
      })
    );

    expect(updated).toEqual(
      expect.objectContaining({
        description: 'Create a test application',
        title: 'Test app x',
        userId: 'asdasd',
      })
    );
  });
});

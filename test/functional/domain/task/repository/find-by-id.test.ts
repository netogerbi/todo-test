/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Collection, ObjectId } from 'mongodb';
import { MongoHelper } from '../../../../../src/infra/db';
import { findById } from '../../../../../src/domain/v1/task/repository';
import { TaskState } from '../../../../../src/domain/v1/task/model';

describe('TaskRepository.findOne', () => {
  const tasks = [
    {
      description: 'Create a test application',
      title: 'Test app x',
      userId: 'asdasd',
      status: TaskState.TODO,
    },
    {
      description: 'Create a test application',
      title: 'Test app y',
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

  it('should find task', async () => {
    const r = await findById(inserted.insertedIds[0].id);

    expect(r).toEqual(
      expect.objectContaining({
        description: 'Create a test application',
        title: 'Test app x',
        userId: 'asdasd',
      })
    );
  });

  it('should return null', async () => {
    const r = await findById(new ObjectId().toHexString());

    expect(r).toBeNull();
  });
});

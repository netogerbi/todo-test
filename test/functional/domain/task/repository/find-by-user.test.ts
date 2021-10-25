/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Collection } from 'mongodb';
import { MongoHelper } from '../../../../../src/infra/db';
import { findByUser } from '../../../../../src/domain/v1/task/repository/find-by-user';
import { TaskCreateDTO } from '../../../../../src/domain/v1/task/dto/task-create-dto';

describe('FarmRepository.findOne', () => {
  let col: Collection;

  const userId = 'asdasd';

  const tasks: TaskCreateDTO[] = [
    {
      description: 'Create a test application',
      title: 'Test app x',
      userId,
    },
    {
      description: 'Create a test application',
      title: 'Test app y',
      userId,
    },
    {
      description: 'Create a test application',
      title: 'Test app',
      userId: 'user2',
    },
  ];

  beforeEach(async () => {
    col = await MongoHelper.getCollection('tasks');
    await col.insertMany(tasks);
  });

  afterEach(async () => {
    col.deleteMany({});
  });

  it("should find user's task", async () => {
    const r = await findByUser(tasks[0].userId);

    expect(r).toHaveLength(2);
    expect(r[0].title).toBe('Test app x');
    expect(r[1].title).toBe('Test app y');
  });

  it('should return null', async () => {
    const r = await findByUser('unexistinguser');

    expect(r).toHaveLength(0);
  });
});

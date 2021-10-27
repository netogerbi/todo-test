/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Collection, InsertManyResult, ObjectId } from 'mongodb';
import { MongoHelper } from '../../../../../src/infra/db';
import { TaskState } from '../../../../../src/domain/v1/task/model';
import { updateTaskService } from '../../../../../src/domain/v1/task/services/updated-task-service';
import { CustomError } from '../../../../../src/utils/errors/interfaces/common-error';

describe('TaskServices.updatedTaskService', () => {
  const tasks = [
    {
      description: 'Create a test application',
      title: 'Test app x',
      userId: 'asdasd',
      status: TaskState.TODO,
    },
  ];

  let col: Collection;
  let inserted: InsertManyResult;
  beforeEach(async () => {
    col = await MongoHelper.getCollection('tasks');
    inserted = await col.insertMany(tasks);
  });

  afterEach(async () => {
    col.deleteMany({});
  });

  it('should update task', async () => {
    const r = await updateTaskService({
      id: inserted.insertedIds[0].toHexString(),
      status: TaskState.DONE,
      userId: 'asdasd',
    });

    expect(r).toEqual(
      expect.objectContaining({
        description: 'Create a test application',
        title: 'Test app x',
        userId: 'asdasd',
        status: 'Done',
      })
    );
  });

  it('should not find task to update', async () => {
    let r: CustomError | undefined;
    try {
      await updateTaskService({
        id: new ObjectId().toHexString(),
        status: TaskState.DONE,
        userId: 'asdasd',
      });
    } catch (err) {
      r = err as CustomError;
    }

    expect(r).toBeInstanceOf(CustomError);
    expect(r?.statusCode).toBe(404);
  });

  it('should not authorize task update - user not own it', async () => {
    let r: CustomError | undefined;
    try {
      await updateTaskService({
        id: inserted.insertedIds[0].toHexString(),
        status: TaskState.DONE,
        userId: 'asdasdx',
      });
    } catch (err) {
      r = err as CustomError;
    }

    expect(r).toBeInstanceOf(CustomError);
    expect(r?.statusCode).toBe(401);
  });
});

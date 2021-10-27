import { MongoHelper } from '../../../src/infra/db';
import { Collection, InsertManyResult, ObjectId } from 'mongodb';
import getToken from '../../helpers/get-token';
import { TaskState } from '../../../src/domain/v1/task/model';

describe('TaskController.updateTaskController', () => {
  let col: Collection;
  const user = {
    id: new ObjectId().toHexString(),
    email: 'test@test.com',
    password: 'test',
    name: 'Test',
  };
  const { token } = getToken(user);

  const tasks = [
    {
      description: 'Create a test application',
      title: 'Test app x',
      userId: user.id,
      status: TaskState.TODO,
    },
  ];

  let inserted: InsertManyResult;
  beforeEach(async () => {
    col = await MongoHelper.getCollection('tasks');
    inserted = await col.insertMany(tasks);
  });

  afterEach(async () => {
    col.deleteMany({});
  });

  it("should update user's task", async () => {
    const r = await global.testRequest
      .patch(
        `/v1/tasks/${inserted.insertedIds[0].toHexString()}/${TaskState.DONE}`
      )
      .set('authorization', token);

    expect(r.status).toBe(200);
    expect(r.body.status).toBe(TaskState.DONE);
  });

  it('should return 404 - task not found', async () => {
    const r = await global.testRequest
      .patch(`/v1/tasks/${new ObjectId().toHexString()}/${TaskState.DONE}`)
      .set('authorization', token);

    expect(r.status).toBe(404);
  });

  it('should return 401', async () => {
    const token2 = getToken({ ...user, id: 'unknownuser' });

    const r = await global.testRequest
      .patch(
        `/v1/tasks/${inserted.insertedIds[0].toHexString()}/${TaskState.DONE}`
      )
      .set('authorization', token2.token);

    expect(r.status).toBe(401);
  });

  it('should return 400', async () => {
    const r = await global.testRequest
      .patch(`/v1/tasks/${inserted.insertedIds[0].toHexString()}/UNKNOWNSTATUS`)
      .set('authorization', token);

    expect(r.status).toBe(400);
  });
});

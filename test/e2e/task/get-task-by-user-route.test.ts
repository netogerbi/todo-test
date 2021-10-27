import { MongoHelper } from '../../../src/infra/db';
import { Collection, ObjectId } from 'mongodb';
import getToken from '../../helpers/get-token';
import { TaskState } from '../../../src/domain/v1/task/model';

describe('User.loginController', () => {
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
    {
      description: 'Create a test application',
      title: 'Test app y',
      userId: user.id,
      status: TaskState.TODO,
    },
    {
      description: 'Create a test application',
      title: 'Test app',
      userId: 'user2',
      status: TaskState.TODO,
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
    const r = await global.testRequest
      .get('/v1/tasks')
      .set('authorization', token);

    expect(r.status).toBe(200);
    expect(r.body).toHaveLength(2);
    expect(r.body[0].userId).toBe(user.id);
    expect(r.body[1].userId).toBe(user.id);
  });

  it("should find none user's task", async () => {
    const token2 = getToken({ ...user, id: new ObjectId().toHexString() });
    const r = await global.testRequest
      .get('/v1/tasks')
      .set('authorization', token2.token);

    expect(r.status).toBe(200);
    expect(r.body).toHaveLength(0);
  });

  it('should return 401', async () => {
    const r = await global.testRequest.get('/v1/tasks');

    expect(r.status).toBe(401);
  });
});

import { MongoHelper } from '../../../src/infra/db';
import { Collection, ObjectId } from 'mongodb';
import getToken from '../../helpers/get-token';

describe('User.loginController', () => {
  let col: Collection;
  const user = {
    id: new ObjectId().toHexString(),
    email: 'test@test.com',
    password: 'test',
    name: 'Test',
  };
  const { token } = getToken(user);

  beforeEach(async () => {
    col = await MongoHelper.getCollection('user');
  });

  afterEach(async () => {
    col.deleteMany({});
  });

  it("should create user's task", async () => {
    const r = await global.testRequest
      .post('/v1/tasks')
      .set('authorization', token)
      .send({
        title: 'My first task',
        description: 'Create scalable and clean code application',
      });

    expect(r.status).toBe(201);
    expect(r.body).toEqual(
      expect.objectContaining({
        title: 'My first task',
        description: 'Create scalable and clean code application',
        status: 'To do',
      })
    );
    expect(r.body.userId).toBe(user.id);
  });

  it('should return 401', async () => {
    await global.testRequest
      .post('/v1/tasks')
      .send({
        title: 'My first task',
        description: 'Create scalable and clean code application',
      })
      .expect(401);
  });

  it('should return 400 - invalid payload', async () => {
    const r = await global.testRequest
      .post('/v1/tasks')
      .set('authorization', token)
      .send({});

    expect(r.status).toBe(400);
    expect(r.body).toEqual({
      message: [
        {
          field: 'title',
          message: 'Title is invalid.',
        },
        {
          field: 'description',
          message: 'Description is invalid.',
        },
      ],
    });
  });
});

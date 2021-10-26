import jwt from 'jsonwebtoken';
import { AuthToken } from '../../src/domain/v1/user/dto';
import env from '../../src/config/env';
import { User } from '../../src/domain/v1/user/model';

export default (user: User): AuthToken => {
  const token = jwt.sign(user, env.jwtSecret);
  return { token: 'Bearer ' + token };
};

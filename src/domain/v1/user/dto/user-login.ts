import { User } from '../model';

export type UserLoginDTO = Pick<User, 'email' | 'password'>;

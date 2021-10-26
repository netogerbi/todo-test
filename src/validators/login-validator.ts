import { body } from 'express-validator';

export const loginValidator = [
  body('email', 'Email is not valid').isEmail(),
  body('password', 'Message cannot be blank').not().isEmpty(),
];

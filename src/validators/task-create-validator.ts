import { body } from 'express-validator';

export const taskCreateValidator = [
  body('title', 'Title is invalid.').isString(),
  body('description', 'Description is invalid.').isString(),
];

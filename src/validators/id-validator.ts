import { body } from 'express-validator';

export const idValidator = [body('id', 'ID is invalid.').isString()];

import { param } from 'express-validator';
import { TaskState } from '../domain/v1/task/model';

export const validateTaskStatusParam = [
  param('status', 'Unknown task status').isIn(Object.values(TaskState)),
];

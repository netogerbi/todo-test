import { Task } from '../model';

export type TaskUpdateDTO = Pick<Task, 'id'> & Partial<Task>;

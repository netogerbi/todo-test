import { Task } from '../model';

export type TaskCreateDTO = Omit<Task, 'id' | 'status'>;

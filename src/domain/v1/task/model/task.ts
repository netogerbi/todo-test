export enum TaskState {
  TODO = 'To do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
  ARCHIVED = 'Archived',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskState;
  userId: string;
}

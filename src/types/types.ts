export interface TaskType {
  task: string;
  subtasks: string[];
  eligibleToDelete?: boolean;
}

export type TypeTask = {
  task: string;
  subtask: string[];
};

export type NormalizedTask = {
  parent: string;
  isCompleted: boolean;
  subtasks: string[];
};

export type NormalizedSubTask = {
  parent: string;
  isCompleted: boolean;
  subtask: string;
};

export type TaskMap = Record<string, NormalizedTask>;

export type SubTaskMap = Record<string, NormalizedSubTask>;

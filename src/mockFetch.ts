import type { TypeTask } from "./types";

const TASKS: TypeTask[] = [
  {
    task: "Clean bedroom",
    subtask: ["Do laundry", "Organize Desk", "Wipe Floors"],
  },
  {
    task: "Study",
    subtask: ["Review chemistry", "Do a React Coding challenge"],
  },
  {
    task: "Build website",
    subtask: ["Choose tech stack", "Design pages", "Develop", "Publish"],
  },
];

export const mockFetch = async (): Promise<TypeTask[]> =>
  new Promise((resolve) => setTimeout(() => resolve(TASKS), 1000));

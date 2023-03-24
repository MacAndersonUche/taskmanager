import { useEffect, useState } from "react";
import "./styles.css";
import { mockFetch } from "./mockFetch";
import type { NormalizedSubTask, SubTaskMap, TaskMap, TypeTask } from "./types";
import { Task } from "./Task";
import { SubTask } from "./Subtask";

const normalizeTasks = (tasks: TypeTask[]) => {
  const subTasksMap: SubTaskMap = {};
  const tasksMap = tasks.reduce((acc, task) => {
    acc[task.task] = {
      parent: task.task,
      isCompleted: false,
      subtasks: task.subtask
    };

    task.subtask.forEach((subtask) => {
      subTasksMap[subtask] = {
        parent: task.task,
        isCompleted: false,
        subtask: subtask
      };
    });
    return acc;
  }, {} as TaskMap);

  return { tasksMap, subTasksMap };
};

export default function App() {
  const [tasks, setTasks] = useState<TaskMap>({});
  const [subTasks, setSubTasks] = useState<SubTaskMap>({});

  // fetch and transform data to set the state
  useEffect(() => {
    mockFetch().then((data) => {
      const { tasksMap, subTasksMap } = normalizeTasks(data);
      setTasks(tasksMap);
      setSubTasks(subTasksMap);
    });
  }, []);

  const toggleCompletedTask = (task: string, subtasks: NormalizedSubTask[]) => {
    const isParentComplete = subtasks.every((sub) => sub.isCompleted);
    const copyTask = { ...tasks[task] };
    copyTask.isCompleted = isParentComplete;
    setTasks({ ...tasks, [task]: copyTask });
  };

  const toggleCompletedSubtask = (subTask: string) => {
    const sub = { ...subTasks[subTask] };
    sub.isCompleted = !sub.isCompleted;
    const newSubtasks = {
      ...subTasks,
      [subTask]: { ...sub }
    };
    setSubTasks(newSubtasks);

    // get the new subtasks and the parent to check if the parent should be striked
    const parent = tasks[sub.parent].parent;
    const subtasks = tasks[parent].subtasks.map((s) => newSubtasks[s]);
    toggleCompletedTask(parent, subtasks);
  };

  const handleClearTasks = () => {
    setTasks((prev) =>
      Object.values(tasks).reduce((acc, task) => {
        if (!task.isCompleted) {
          acc[task.parent] = task;
        }
        return acc;
      }, {} as TaskMap)
    );
  };

  return (
    <div className="App">
      <button onClick={handleClearTasks}>Clear Completed tasks</button>
      <ul
        style={{
          display: "grid",
          placeContent: "center"
        }}
      >
        {Object.values(tasks)?.map((task) => {
          return (
            <Task
              key={task.parent}
              isCompleted={task.isCompleted}
              parent={task.parent}
            >
              {task.subtasks?.map((s) => {
                const subTask = subTasks[s];
                return (
                  <SubTask
                    key={subTask.subtask}
                    isCompleted={subTask.isCompleted}
                    subtask={subTask.subtask}
                    toggleCompletedTask={toggleCompletedSubtask} parent={""} />
                );
              })}
            </Task>
          );
        })}
      </ul>
    </div>
  );
}

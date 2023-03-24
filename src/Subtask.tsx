import { NormalizedSubTask } from "./types";

type SubTaskProps = NormalizedSubTask & {
    toggleCompletedTask: (subTask: string) => void;
};
export const SubTask = ({
    isCompleted,
    subtask,
    toggleCompletedTask
}: SubTaskProps) => {
    return (
        <li style={{ padding: "0.25rem" }}>
            <button
                style={{
                    appearance: "none",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecorationLine: isCompleted ? "line-through" : "none"
                }}
                onClick={() => toggleCompletedTask(subtask)}
            >
                {subtask}
            </button>
        </li>
    );
};

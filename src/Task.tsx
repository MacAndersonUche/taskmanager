import { NormalizedTask } from "./types";

type TaskProps = React.PropsWithChildren<Omit<NormalizedTask, "subtasks">>;

export const Task = ({ isCompleted, parent, children }: TaskProps) => {
    return (
        <li
            style={{
                padding: "0.25rem",
                textAlign: "left",
                listStyle: "none",
                textDecorationLine: isCompleted ? "line-through" : "none"
            }}
        >
            {parent}
            <ul
                style={{
                    listStyle: "none"
                }}
            >
                {children}
            </ul>
        </li>
    );
};

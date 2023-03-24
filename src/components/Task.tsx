import React, { useState } from "react"
import { TaskType } from "../types/types"
import SingleTask from "./SingleTask"

interface Props {
    task: TaskType
}

const Task = ({ task }: Props) => {
    const [subtasksCompleted, setSubtasksCompleted] = useState(false)
    let count: boolean[] = []

    const changeCount = (state: boolean) => {
        if (!state) {
            count.push(state)
        } else {
            count.pop()
        }

        if (count.length === task.subtasks.length) {
            setSubtasksCompleted(true)
            task.eligibleToDelete = true
        } else {
            setSubtasksCompleted(false)
            task.eligibleToDelete = false
        }

    }


    return (
        <div>
            <div>{!subtasksCompleted ? <p>{task.task}</p> : <s>{task.task}</s>}</div>
            <ul >
                {task.subtasks.map(tex => <SingleTask text={tex} changeCountHandler={changeCount} key={tex} />)}
            </ul>
        </div>
    )
}

export default Task
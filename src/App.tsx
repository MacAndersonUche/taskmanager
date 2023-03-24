import { useState } from 'react'
import { TaskType } from './types/types'
import { MOCK_TASK } from './mocks/mock'
import Task from './components/Task'

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(MOCK_TASK)

  const handleClick = () => {
    const filtered = tasks.filter(task => task.eligibleToDelete !== true)
    setTasks(filtered)

  }
  return (
    <div>
      <button onClick={handleClick}>Click To Delete</button>
      {tasks.map(task => <Task task={task} key={task.task} />)}
    </div>

  )
}

export default App

import TodoForm from '../todo-form/TodoForm'
import TodoList from '../todo-list/TodoList'
import styles from './App.module.css'
import { useState } from 'react'
import { useTasks } from '../../utils/hooks/use-tasks'
import type { Task, FilterItems } from '../../utils/types'

function App() {

  const [filter, setFilter] = useState<FilterItems>('all') 
  const [tasks, addTask, deleteTask, toggleTask, editTask] = useTasks()

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === 'all') return true
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
  })

  const activeTasksCount = tasks.reduce((sum, task) => {
    return task.completed ? sum : sum + 1
  }, 0)

  return (
    <div className={styles.div}>
      <div className={styles.wrapper}>
        <TodoForm addTask={addTask}/>
        <select name='sort' className={styles.select} onChange={(e) => setFilter(e.target.value as FilterItems)}>
          <option value='all'>Все</option>
          <option value='active'>Активные</option>
          <option value='completed'>Выполненные</option>
        </select>
      </div>
      <TodoList toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} tasks={filteredTasks}/>

      {tasks.length ? <p className={styles.p}>Осталось {activeTasksCount} задач</p> : ''}
    </div>
  )
}

export default App

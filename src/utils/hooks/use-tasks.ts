import { useState, useEffect, useCallback } from "react"
import type { Task } from "../types"

export const useTasks = (): [
    Task[],
    (name: string) => void,
    (id: number) => void,
    (id: number) => void,
    (id: number, name: string) => void,
] => {
    const [tasks, setTasks] = useState<Task[]>(() => {
      const storageTasks = localStorage.getItem('tasks')

      return storageTasks ? JSON.parse(storageTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = useCallback((name: string) => {

      if (name === '') return 
 
      const newTask = {
        id: Date.now(),
        name,
        completed: false,
      }

      setTasks(prev => [...prev, newTask])
  }, [setTasks])

  const deleteTask = useCallback((id: number) => {
      setTasks(prev => prev.filter(item => item.id !== id))
  }, [setTasks])

  const toggleTask = useCallback((id: number) => {
      setTasks(prev => prev.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
      ))
  }, [setTasks])

  const editTask = useCallback((id: number, name: string) => {
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? {...task, name} : task
        )
      )
  }, [setTasks])

  return [tasks, addTask, deleteTask, toggleTask, editTask]
}
import React from 'react';
import type { Task } from '../../utils/types';
import TodoItem from '../todo-item/TodoItem';
import styles from './TodoList.module.css'

type TProps = {
    tasks: Task[]
    deleteTask: (id: number) => void
    toggleTask: (id: number) => void
    editTask: (id: number, name:string) => void
}

const TodoList = React.memo(({tasks, deleteTask, toggleTask, editTask}: TProps) => {
    if (!tasks.length) {
        return <span>Задач пока нет...</span>
    }

    return (
        <ul className={styles.list}>
            {tasks.map(task => {
                return <TodoItem key={task.id} deleteTask={deleteTask} toggleTask={toggleTask} editTask={editTask} task={task}/>
            })}
        </ul>
    )
})

export default TodoList
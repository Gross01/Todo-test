import { useState } from "react"
import type { Task } from "../../utils/types"
import styles from './TodoItem.module.css'
import React from "react"

type TProps = {
    task: Task
    deleteTask: (id: number) => void
    toggleTask: (id: number) => void
    editTask: (id: number, name:string) => void
}

const TodoItem = React.memo(({task, deleteTask, toggleTask, editTask}: TProps) => {

    const {name, id} = task
    const [newName, setNewName] = useState(name)
    const [checked, setChecked] = useState(task.completed)
    const [editable, setEditable] = useState(false)

    const textDecoration = checked ? 'line-through' : 'none'

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
        toggleTask(task.id)
    }

    const editToggle = () => {
        if (editable && !newName) return 

        setEditable(!editable)

        if (editable) editTask(id, newName)
    }

    return (
        <li className={styles.item} >
            <input type='checkbox' checked={checked} onChange={onChange}/>
            {editable 
                ? <input 
                    className={styles.editInput} 
                    type='text' name='task-edit' 
                    placeholder="Название..."
                    value={newName ?? ''}
                    onChange={(e) => setNewName(e.target.value)}
                    /> 
                : <span style={{textDecoration: textDecoration}}>{name}</span>
            }
            <div className={styles.buttons}>
                <button className={`${styles.edit} ${editable ? styles.editable : ''}`} type='button' onClick={editToggle}></button>
                <button className={styles.delete} type='button' onClick={() => deleteTask(task.id)}></button>
            </div>
        </li>
    )
})

export default TodoItem
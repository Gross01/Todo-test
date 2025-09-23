import { useEffect, useState } from "react"
import styles from './TodoForm.module.css'

type TProps = {
    addTask: (name: string) => void
}

function TodoForm ({addTask}: TProps) {
    const [value, setValue] = useState('')

    useEffect(() => {
        const handlerEnter = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                addTask(value)
            }
        }

        document.addEventListener('keydown', handlerEnter)

        return () => {
            document.removeEventListener('keydown', handlerEnter)
        }
    }, [addTask, value])

    return (
        <div className={styles.div}>
            <input 
                className={styles.input}
                type='text' 
                name='todo-name' 
                placeholder="Введите название задачи"
                value={value ?? ''}
                onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.button} type='button' onClick={() => addTask(value)}>Добавить</button>
        </div>
    )
}

export default TodoForm
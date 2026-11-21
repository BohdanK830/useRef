// src/components/TodoList.tsx
import type { Task } from "../types";
import { TodoItem } from "./TodoItem";
import styles from './TodoList.module.css';

interface TodoListProps {
  tasks: Task[];
  onToggleTask: (id: number | string) => void;
}

export function TodoList({ tasks, onToggleTask }: TodoListProps) {
  if (tasks.length === 0) {
    return (
      <div className={styles['todo-list-empty']}>
        <div className={styles['todo-list-empty__icon']}>✨</div>
        <h3 className={styles['todo-list-empty__title']}>Список завдань порожній</h3>
        <p className={styles['todo-list-empty__subtitle']}>
          Додайте нове завдання вище, щоб розпочати свій продуктивний день!
        </p>
      </div>
    );
  }

  return (
    <ul className={styles['todo-list']}>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />
      ))}
    </ul>
  );
}


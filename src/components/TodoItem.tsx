// src/components/TodoItem.tsx
import type { Task, Priority } from "../types";
import styles from './TodoItem.module.css';

interface TodoItemProps {
  task: Task;
  onToggleTask: (id: number | string) => void;
  onDeleteTask?: (id: number | string) => void;
}

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Низький",
  normal: "Звичайний",
  high: "Високий",
};

const today = new Date().toISOString().slice(0, 10); // Отримуємо поточну дату у форматі "YYYY-MM-DD"

export function TodoItem({ task, onToggleTask, onDeleteTask }: TodoItemProps) {
  const isOverdue = Boolean(task.isOverdue ?? (task.date && !task.completed && task.date < today));

  const itemClasses = [
    styles['todo-item'],
    styles[`todo-item--${task.priority}`],
    task.completed ? styles['todo-item--completed'] : "",
    isOverdue ? styles['todo-item--overdue'] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={itemClasses}>
      <label
        className={styles['todo-item__checkbox-label']}
        title={task.completed ? "Виконано" : "Позначити як виконане"}
      >
        <input
          type="checkbox"
          className={styles['todo-item__checkbox']}
          defaultChecked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
      </label>

      <div className={styles['todo-item__content']}>
        <p className={styles['todo-item__text']}>{task.text}</p>
        <div className={styles['todo-item__meta']}>
          <span
            className={styles['todo-item__badge'] + " " + styles[`todo-item__badge--${task.priority}`]}
          >
            {PRIORITY_LABELS[task.priority]}
          </span>
          {task.date && (
            <span
              className={styles['todo-item__date'] + " " + (isOverdue ? styles['todo-item__date--overdue'] : "")}
            >
              📅 {task.date}
              {isOverdue && (
                <span className={styles['todo-item__overdue-alert']}>⚠️ Прострочено</span>
              )}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className={styles['todo-item__delete-btn']}
        title="Видалити завдання"
        onClick={() => onDeleteTask && onDeleteTask(task.id)}
      >
        🗑️
      </button>
    </li>
  );
}


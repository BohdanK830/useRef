// src/components/TaskForm.tsx
import { useState, useRef, useEffect, type FormEvent } from "react";
import type { Priority } from "../types";

interface TaskFormProps {
  onAddTask: (task: { text: string; priority: Priority; date: string }) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  // 1. Локальний стан для кожного контрольованого поля форми
  const [text, setText] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("normal");
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // 2. Реф для автофокусу на полі введення
  const inputRef = useRef<HTMLInputElement>(null);

  // 3. Автофокус при першому монтуванні форми
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 4. Обробник відправки форми
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Валідація довжини
    if (text.trim().length < 3) {
      setError("Текст завдання має містити щонайменше 3 символи!");
      inputRef.current?.focus();
      return;
    }

    // Передаємо дані в App через колбек
    onAddTask({
      text: text.trim(),
      priority,
      date,
    });

    // Очищаємо форму після додавання
    setText("");
    setPriority("normal");
    setDate("");
    setError(null);

    // Повертаємо курсор користувача в інпут для швидкого додавання наступної задачі
    inputRef.current?.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__input-group">
        <input
          ref={inputRef}
          type="text"
          className="task-form__input"
          placeholder="Що потрібно зробити?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          autoComplete="off"
        />
        {error && (
          <span
            style={{
              color: "#ef4444",
              fontSize: "0.8rem",
              marginTop: "4px",
              display: "block",
            }}
          >
            ⚠️ {error}
          </span>
        )}
      </div>

      <div className="task-form__controls">
        <div className="task-form__group">
          <label className="task-form__label" htmlFor="priority-select">
            Пріоритет:
          </label>
          <select
            id="priority-select"
            className="task-form__select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">🟢 Низький</option>
            <option value="normal">🟡 Звичайний</option>
            <option value="high">🔴 Високий</option>
          </select>
        </div>

        <div className="task-form__group">
          <label className="task-form__label" htmlFor="deadline-input">
            Дедлайн:
          </label>
          <input
            id="deadline-input"
            type="date"
            className="task-form__date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="task-form__submit-btn"
          disabled={text.trim().length === 0}
        >
          <span className="task-form__btn-icon">＋</span>
          <span>Додати</span>
        </button>
      </div>
    </form>
  );
}

// src/App.tsx
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import type { Task, Priority } from "./types";

// Початкові мокові дані (використовуються, якщо localStorage ще порожній)
const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    text: "Опанувати контрольовані та неконтрольовані елементи",
    completed: false,
    priority: "high",
    date: "2026-11-14",
    isOverdue: false,
  },
  {
    id: 2,
    text: "Навчитись використовувати хук useRef для DOM-фокусу",
    completed: true,
    priority: "normal",
    date: "2026-11-13",
  },
];

export function App() {
  // 1. Стан завдань із лінивою ініціалізацією з localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem("tasks_pv511");
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch (error) {
      console.error("Помилка читання localStorage:", error);
      return DEFAULT_TASKS;
    }
  });

  // 2. Автоматичне збереження в localStorage при будь-якій зміні tasks
  useEffect(() => {
    localStorage.setItem("tasks_pv511", JSON.stringify(tasks));
  }, [tasks]);

  // 3. Похідний стан (Derived State) — обчислюємо без додаткового useState!
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  // 4. Функція додавання нового завдання (передається в TaskForm)
  const handleAddTask = (taskData: {
    text: string;
    priority: Priority;
    date: string;
  }) => {
    const newTask: Task = {
      id: Date.now(), // Унікальний числовий ID на основі мітки часу
      text: taskData.text,
      priority: taskData.priority,
      date: taskData.date || undefined,
      completed: false,
      isOverdue: false,
    };

    // Імутабельне додавання в стан: копіюємо старі таски і додаємо нову на початок
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <main className="app-container">
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <Counter total={total} completed={completed} />
      <TodoList tasks={tasks} />
    </main>
  );
}

export default App;

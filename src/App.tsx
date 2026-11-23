// src/App.tsx
import { useState, useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/TodoList";
import type { Task, Priority, FilterStatus } from "./types";

// Початкові мокові дані (використовуються, якщо localStorage ще порожній)
const DEFAULT_TASKS: Task[] = [
  {
    id: 1,
    text: "Опанувати декомпозицію компонентів у React",
    completed: true,
    priority: "normal",
    date: "2026-11-12",
  },
  {
    id: 2,
    text: "Вивчити роботу з хуками useState, useEffect та useRef",
    completed: false,
    priority: "high",
    date: "2026-11-13",
  },
  {
    id: 3,
    text: "Створити завершений додаток Task List із збереженням у LocalStorage",
    completed: false,
    priority: "low",
    date: "2026-11-20",
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

  const [filter, setFilter] = useState<FilterStatus>("all");

  // 2. Автоматичне збереження в localStorage при будь-якій зміні tasks
  useEffect(() => {
    localStorage.setItem("tasks_pv511", JSON.stringify(tasks));
  }, [tasks]);

  // 3. Похідний стан (Derived State) — обчислюємо без додаткового useState!
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const active = total - completed;

  useEffect(() => {
    document.title = `Завдань: ${total}, Виконано: ${completed}, В процесі: ${active}`;
  }, [active]);

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
  const handleToggleTask = (id: number | string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number | string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const displayedTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks; // filter === "all"
  }, [tasks, filter]);

  return (
    <main className="app-container">
      <Header />
      <TaskForm onAddTask={handleAddTask} />
      <Counter total={total} completed={completed} currentFilter={filter} onFilterChange={setFilter} />
      <TodoList tasks={displayedTasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
    </main>
  );
}

export default App;

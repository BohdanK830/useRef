// src/components/Counter.tsx
import type { FilterStatus } from "../types";
import styles from './Counter.module.css';

interface CounterProps {
  total: number;
  completed: number;
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export function Counter({ total, completed, currentFilter, onFilterChange }: CounterProps) {
  const active = Math.max(0, total - completed);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className={styles.counter} aria-label="Статистика завдань">
      <div className={styles.counter__grid}>
        <div
          className={`${styles.counter__card} ${styles['counter__card--total']} ${
            currentFilter === "all" ? styles['counter__card--selected'] : ""
          }`}
          onClick={() => onFilterChange("all")}
          role="button"
          tabIndex={0}
          title="Показати всі завдання"
        >
          <span className={styles.counter__label}>Всього</span>
          <span className={styles.counter__value}>{total}</span>
        </div>

        <div
          className={`${styles.counter__card} ${styles['counter__card--active']} ${
            currentFilter === "active" ? styles['counter__card--selected'] : ""
          }`}
          onClick={() => onFilterChange("active")}
          role="button"
          tabIndex={0}
          title="Показати тільки активні"
        >
          <span className={styles.counter__label}>В процесі</span>
          <span className={styles.counter__value}>{active}</span>
        </div>

        <div
          className={`${styles.counter__card} ${styles['counter__card--completed']} ${
            currentFilter === "completed" ? styles['counter__card--selected'] : ""
          }`}
          onClick={() => onFilterChange("completed")}
          role="button"
          tabIndex={0}
          title="Показати тільки виконані"
        >
          <span className={styles.counter__label}>Виконано</span>
          <span className={styles.counter__value}>{completed}</span>
        </div>
      </div>
    </section>
  );
}


'use client';

import type { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onToggle: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskList({ tasks, onEdit, onToggle, onDelete }: TaskListProps) {
  return (
    <ul className="list-group list-group-flush">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex align-items-start gap-3"
        >
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary mt-1 flex-shrink-0 rounded-circle p-0 d-flex align-items-center justify-content-center"
            style={{ width: 24, height: 24 }}
            onClick={() => onToggle(task)}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed && <i className="bi bi-check text-primary small"></i>}
          </button>
          <div className="flex-grow-1 min-w-0">
            <p className={`mb-0 fw-medium text-body ${task.completed ? 'text-decoration-line-through text-body-secondary' : ''}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="mb-0 small text-body-secondary text-truncate">{task.description}</p>
            )}
          </div>
          <div className="d-flex gap-1 flex-shrink-0">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete(task)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

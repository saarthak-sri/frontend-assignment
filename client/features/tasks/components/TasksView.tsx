'use client';

import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { tasksApi } from '@/lib/api/tasks';
import type { Task, PaginatedTasks } from '@/types';
import { TaskFilters } from './TaskFilters';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { TaskEmpty } from './TaskEmpty';
import { TaskPagination } from './TaskPagination';

interface TasksViewProps {
  initialFilter?: 'all' | 'completed' | 'pending';
}

export function TasksView({ initialFilter = 'all' }: TasksViewProps) {
  const [data, setData] = useState<PaginatedTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>(initialFilter);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await tasksApi.getTasks({
        page,
        limit: 10,
        search: search || undefined,
        filter: filter === 'all' ? undefined : filter,
      });
      setData(result);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to load tasks');
      setData({ tasks: [], total: 0, page: 1, limit: 10, totalPages: 0 });
    } finally {
      setLoading(false);
    }
  }, [page, search, filter]);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const refetch = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openNewTask = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-body-secondary d-flex flex-wrap align-items-center justify-content-between gap-3 py-3">
        <div>
          <h5 className="card-title mb-0 text-body">Task list</h5>
          {data != null && (
            <p className="text-body-secondary small mb-0">{data.total} task{data.total === 1 ? '' : 's'}</p>
          )}
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <TaskFilters
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
            onSearch={() => setPage(1)}
          />
          <button type="button" className="btn btn-primary" onClick={openNewTask}>
            <i className="bi bi-plus-lg me-1"></i> New task
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card-body">
          <div className="placeholder-glow">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="d-flex align-items-center gap-3 mb-3">
                <span className="placeholder rounded" style={{ width: 24, height: 24 }}></span>
                <div className="flex-grow-1">
                  <span className="placeholder col-8"></span>
                  <span className="placeholder col-4 d-block mt-1"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : data && data.tasks.length > 0 ? (
        <>
          <TaskList
            tasks={data.tasks}
            onEdit={(task) => {
              setEditingTask(task);
              setFormOpen(true);
            }}
            onToggle={async (task) => {
              const next = !task.completed;
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      tasks: prev.tasks.map((t) =>
                        t.id === task.id ? { ...t, completed: next } : t
                      ),
                    }
                  : null
              );
              try {
                await tasksApi.updateTask(task.id, { completed: next });
              } catch (err) {
                setData((prev) =>
                  prev
                    ? {
                        ...prev,
                        tasks: prev.tasks.map((t) =>
                          t.id === task.id ? { ...t, completed: task.completed } : t
                        ),
                      }
                    : null
                );
                toast.error(err instanceof Error ? err.message : 'Update failed');
              }
            }}
            onDelete={async (task) => {
              setData((prev) =>
                prev
                  ? {
                      ...prev,
                      tasks: prev.tasks.filter((t) => t.id !== task.id),
                      total: Math.max(0, prev.total - 1),
                    }
                  : null
              );
              try {
                await tasksApi.deleteTask(task.id);
                toast.success('Task deleted');
              } catch (err) {
                refetch();
                toast.error(err instanceof Error ? err.message : 'Delete failed');
              }
            }}
          />
          {data.totalPages > 1 && (
            <TaskPagination
              page={data.page}
              totalPages={data.totalPages}
              total={data.total}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        <TaskEmpty onAdd={openNewTask} />
      )}

      {formOpen && (
        <TaskForm
          task={editingTask}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
          onSuccess={() => {
            setFormOpen(false);
            setEditingTask(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}

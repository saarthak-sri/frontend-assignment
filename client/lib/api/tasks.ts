import { apiClient } from './client';
import type { Task, PaginatedTasks } from '@/types';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export interface GetTasksParams {
  page?: number;
  limit?: number;
  search?: string;
  filter?: 'all' | 'completed' | 'pending';
}

export const tasksApi = {
  async getStats(): Promise<TaskStats> {
    const { data } = await apiClient.get<TaskStats>('/tasks/stats');
    return data;
  },

  async getTasks(params?: GetTasksParams): Promise<PaginatedTasks> {
    const { data } = await apiClient.get<PaginatedTasks>('/tasks', { params });
    return data;
  },

  async getTask(id: string): Promise<Task> {
    const { data } = await apiClient.get<Task>(`/tasks/${id}`);
    return data;
  },

  async createTask(payload: { title: string; description?: string }): Promise<Task> {
    const { data } = await apiClient.post<Task>('/tasks', payload);
    return data;
  },

  async updateTask(id: string, payload: Partial<{ title: string; description: string; completed: boolean }>): Promise<Task> {
    const { data } = await apiClient.put<Task>(`/tasks/${id}`, payload);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },
};

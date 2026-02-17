import mongoose from 'mongoose';
import { Task } from '../models/Task';
import { AppError } from '../utils/AppError';

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TaskFilters {
  search?: string;
  filter?: 'all' | 'completed' | 'pending';
  page?: number;
  limit?: number;
}

export interface PaginatedTasks {
  tasks: Array<{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function toTaskResponse(doc: { _id: mongoose.Types.ObjectId; title: string; description?: string; completed: boolean; createdAt: Date; updatedAt: Date }) {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description ?? '',
    completed: doc.completed,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

export const taskService = {
  async getStats(userId: string): Promise<TaskStats> {
    const uid = new mongoose.Types.ObjectId(userId);
    const [total, completed, pending] = await Promise.all([
      Task.countDocuments({ userId: uid }),
      Task.countDocuments({ userId: uid, completed: true }),
      Task.countDocuments({ userId: uid, completed: false }),
    ]);
    return { total, completed, pending };
  },

  async getTasks(userId: string, filters: TaskFilters): Promise<PaginatedTasks> {
    const page = Math.max(1, filters.page ?? 1);
    const limit = Math.min(50, Math.max(1, filters.limit ?? 10));
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { userId: new mongoose.Types.ObjectId(userId) };

    if (filters.search?.trim()) {
      const search = filters.search.trim();
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (filters.filter === 'completed') {
      query.completed = true;
    } else if (filters.filter === 'pending') {
      query.completed = false;
    }

    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Task.countDocuments(query),
    ]);

    return {
      tasks: tasks.map(toTaskResponse),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getTaskById(userId: string, taskId: string) {
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    return toTaskResponse(task);
  },

  async createTask(userId: string, input: CreateTaskInput) {
    const task = await Task.create({
      title: input.title.trim(),
      description: (input.description ?? '').trim(),
      userId: new mongoose.Types.ObjectId(userId),
    });
    return toTaskResponse(task);
  },

  async updateTask(userId: string, taskId: string, input: UpdateTaskInput) {
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    if (input.title !== undefined) task.title = input.title.trim();
    if (input.description !== undefined) task.description = input.description.trim();
    if (input.completed !== undefined) task.completed = input.completed;
    await task.save();
    return toTaskResponse(task);
  },

  async deleteTask(userId: string, taskId: string) {
    const result = await Task.deleteOne({ _id: taskId, userId });
    if (result.deletedCount === 0) {
      throw new AppError('Task not found', 404);
    }
  },
};

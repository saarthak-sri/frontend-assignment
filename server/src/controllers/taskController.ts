import { Response } from 'express';
import { taskService } from '../services/taskService';
import { AuthRequest } from '../middleware/auth';

export const taskController = {
  async getStats(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const stats = await taskService.getStats(req.userId);
    res.json(stats);
  },

  async getTasks(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const { page, limit, search, filter } = req.query;
    const result = await taskService.getTasks(req.userId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search: search as string | undefined,
      filter: filter as 'all' | 'completed' | 'pending' | undefined,
    });
    res.json(result);
  },

  async getTask(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const task = await taskService.getTaskById(req.userId, req.params.id);
    res.json(task);
  },

  async createTask(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const task = await taskService.createTask(req.userId, req.body);
    res.status(201).json(task);
  },

  async updateTask(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const task = await taskService.updateTask(req.userId, req.params.id, req.body);
    res.json(task);
  },

  async deleteTask(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    await taskService.deleteTask(req.userId, req.params.id);
    res.status(204).send();
  },
};

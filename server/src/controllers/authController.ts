import { Response } from 'express';
import { authService } from '../services/authService';
import { AuthRequest } from '../middleware/auth';

export const authController = {
  async register(req: AuthRequest, res: Response) {
    const { name, email, password } = req.body;
    const result = await authService.register({ name, email, password });
    res.status(201).json(result);
  },

  async login(req: AuthRequest, res: Response) {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json(result);
  },

  async me(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const user = await authService.getMe(req.userId);
    res.json(user);
  },
};

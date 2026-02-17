import { Response } from 'express';
import { userService } from '../services/userService';
import { AuthRequest } from '../middleware/auth';

export const userController = {
  async updateProfile(req: AuthRequest, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const user = await userService.updateProfile(req.userId, req.body);
    res.json(user);
  },
};

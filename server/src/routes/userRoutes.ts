import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { profileUpdateValidator } from '../utils/validators';

const router = Router();

router.put('/profile', authMiddleware, validate(profileUpdateValidator), userController.updateProfile.bind(userController));

export default router;

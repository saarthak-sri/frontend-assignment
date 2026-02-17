import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { registerValidator, loginValidator } from '../utils/validators';

const router = Router();

router.post('/register', validate(registerValidator), authController.register.bind(authController));
router.post('/login', validate(loginValidator), authController.login.bind(authController));
router.get('/me', authMiddleware, authController.me.bind(authController));

export default router;

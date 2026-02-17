import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  createTaskValidator,
  updateTaskValidator,
  taskIdParamValidator,
  getTasksValidator,
} from '../utils/validators';

const router = Router();

router.use(authMiddleware);

router.get('/stats', taskController.getStats.bind(taskController));
router.get('/', validate(getTasksValidator), taskController.getTasks.bind(taskController));
router.get('/:id', validate(taskIdParamValidator), taskController.getTask.bind(taskController));
router.post('/', validate(createTaskValidator), taskController.createTask.bind(taskController));
router.put('/:id', validate(updateTaskValidator), taskController.updateTask.bind(taskController));
router.delete('/:id', validate(taskIdParamValidator), taskController.deleteTask.bind(taskController));

export default router;

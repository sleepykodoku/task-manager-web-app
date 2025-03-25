import express from 'express';
import {
  showTasks,
  createTask,
  toggleTaskCompletion,
  removeTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', showTasks);
router.post('/add-task', createTask);
router.post('/toggle-task/:id', toggleTaskCompletion);
router.post('/delete-task/:id', removeTask);

export default router;
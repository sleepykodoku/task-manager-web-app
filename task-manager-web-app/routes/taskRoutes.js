import express from 'express';
import {
  showTasks,
  createTask,
  toggleTaskCompletion,
  removeTask,
  updateTaskDetails,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', showTasks);
router.post('/add-task', createTask);
router.post('/toggle-task/:id', toggleTaskCompletion);
router.post('/delete-task/:id', removeTask);
router.put('/tasks/:id', updateTaskDetails);

export default router;
import {
  getAllTasks,
  addTask,
  toggleTask,
  deleteTask,
  updateTask
} from '../models/taskModel.js';

// Enhanced validation with detailed messages
const validateTaskInput = (title, description) => {
  const errors = [];
  
  // Title validation
  title = title?.trim() || '';
  if (!title) {
    errors.push("Title is required");
  } else {
    if (title.length < 3) {
      errors.push("Title must be at least 3 characters");
    }
    if (title.length > 100) {
      errors.push("Title cannot exceed 100 characters");
    }
  }

  // Description validation
  if (description && description.length > 500) {
    errors.push("Description cannot exceed 500 characters");
  }

  return errors;
};

// Helper to build error redirect URL
const buildErrorUrl = (errors, formData = {}) => {
  const params = new URLSearchParams();
  if (errors.length > 0) {
    params.append('errors', JSON.stringify(errors));
  }
  if (formData.title) {
    params.append('title', formData.title);
  }
  if (formData.description) {
    params.append('description', formData.description);
  }
  return `/?${params.toString()}`;
};

export const showTasks = async (req, res) => {
  try {
      const { search, filter, edit } = req.query;
      const tasks = await getAllTasks(search, filter || 'All');
      
      // Add editing state to tasks
      const tasksWithEditState = tasks.map(task => ({
          ...task,
          isEditing: edit === task.id.toString()
      }));

      res.render('index', { 
          tasks: tasksWithEditState, 
          searchQuery: search, 
          filter: filter || 'All',
          errors: req.query.errors ? JSON.parse(req.query.errors) : [], // Error handling
          formData: {
              title: req.query.title || '',
              description: req.query.description || ''
          } 
      });
  } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send('Error fetching tasks');
  }
};

export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const errors = validateTaskInput(title, description);

  if (errors.length > 0) {
    return res.redirect(buildErrorUrl(errors, { title, description }));
  }

  try {
    await addTask(title.trim(), description?.trim(), priority || 'Medium');
    res.redirect("/");
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to create task"], { title, description }));
  }
};

export const toggleTaskCompletion = async (req, res) => {
  try {
    await toggleTask(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to toggle task status"]));
  }
};

export const removeTask = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error('Error:', error);
    res.redirect(buildErrorUrl(["Failed to delete task"]));
  }
};

export const enableEditMode = async (req, res) => {
  try {
      const tasks = await getAllTasks(req.query.search || '');
      const taskId = req.params.id;
      
      // Find the task being edited
      const taskToEdit = tasks.find(task => task.id.toString() === taskId.toString());
      
      if (!taskToEdit) {
          return res.redirect(buildErrorUrl(["Task not found"]));
      }

      const updatedTasks = tasks.map(task => ({
          ...task,
          isEditing: task.id.toString() === taskId.toString()
      }));
      
      res.render('index', {
          tasks: updatedTasks,
          errors: [], // No errors when enabling edit mode
          formData: { 
              title: taskToEdit.title, 
              description: taskToEdit.description || '' 
          },
          searchQuery: req.query.search || '',
          filter: req.query.filter || 'All'
      });
  } catch (error) {
      console.error('Error:', error);
      res.redirect(buildErrorUrl(["Failed to enable edit mode"]));
  }
};

export const updateTaskDetails = async (req, res) => {
  const { title, description, priority } = req.body;
  const errors = validateTaskInput(title, description);

  if (errors.length > 0) {
    try {
      const tasks = await getAllTasks(req.query.search || '');
      const taskId = req.params.id;
      
      const updatedTasks = tasks.map(task => ({
          ...task,
          isEditing: task.id === taskId
      }));
      
      return res.render('index', {
          tasks: updatedTasks,
          errors,
          formData: { title, description },
          searchQuery: req.query.search || '',
          filter: req.query.filter || 'All'
      });
    } catch (error) {
      console.error('Error:', error);
      return res.redirect(buildErrorUrl(["Failed to update task"], { title, description }));
    }
  }

  try {
      await updateTask(req.params.id, title.trim(), description?.trim(), priority);
      res.redirect("/?search=" + encodeURIComponent(req.query.search || ''));
  } catch (error) {
      console.error('Error:', error);
      res.redirect(buildErrorUrl(["Failed to update task"], { title, description }));
  }
};

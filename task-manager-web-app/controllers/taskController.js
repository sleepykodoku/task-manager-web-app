import {
    getAllTasks,
    addTask,
    toggleTask,
    deleteTask,
  } from '../models/taskModel.js';
  
  export const showTasks = async (req, res) => {
    try {
      const { search, filter } = req.query;
      const tasks = await getAllTasks(search, filter || 'All');
      res.render('index', { tasks, searchQuery: search, filter: filter || 'All' });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send('Error fetching tasks');
    }
  };
  
  export const createTask = async (req, res) => {
    try {
      const { title, description, priority } = req.body;
      
      // Validation
      if (!title || title.length < 3 || title.length > 100) {
        return res.status(400).send('Title must be between 3-100 characters');
      }
      
      if (description && description.length > 500) {
        return res.status(400).send('Description cannot exceed 500 characters');
      }
  
      await addTask(title, description, priority || 'Medium');
      res.redirect('/');
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).send('Error adding task');
    }
  };
  
  export const toggleTaskCompletion = async (req, res) => {
    try {
      const { id } = req.params;
      await toggleTask(id);
      res.redirect('/');
    } catch (error) {
      console.error('Error toggling task:', error);
      res.status(500).send('Error toggling task');
    }
  };
  
  export const removeTask = async (req, res) => {
    try {
      const { id } = req.params;
      await deleteTask(id);
      res.redirect('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send('Error deleting task');
    }
  };
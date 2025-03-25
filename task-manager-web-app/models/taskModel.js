import { query } from '../config/db.js';

export const getAllTasks = async (searchQuery, filter) => {
  let sql = 'SELECT * FROM tasks';
  const params = [];

  if (searchQuery) {
    sql += ' WHERE title ILIKE $1 OR description ILIKE $1';
    params.push(`%${searchQuery}%`);
  }

  if (filter === 'Completed') {
    sql += searchQuery ? ' AND completed = true' : ' WHERE completed = true';
  } else if (filter === 'Incomplete') {
    sql += searchQuery ? ' AND completed = false' : ' WHERE completed = false';
  }

  const result = await query(sql, params);
  return result.rows;
};

export const addTask = async (title, description, priority) => {
  const result = await query(
    'INSERT INTO tasks (title, description, priority) VALUES ($1, $2, $3) RETURNING *',
    [title, description, priority]
  );
  return result.rows[0];
};

export const toggleTask = async (id) => {
  const result = await query(
    'UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

export const deleteTask = async (id) => {
  await query('DELETE FROM tasks WHERE id = $1', [id]);
};

export const updateTask = async (id, title, description, priority) => {
    const result = await query(
      'UPDATE tasks SET title=$1, description=$2, priority=$3 WHERE id=$4 RETURNING *',
      [title, description, priority, id]
    );
    return result.rows[0];
  };
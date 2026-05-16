import fs from 'node:fs/promises';
import path from 'node:path';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const DATA_DIR = './data';
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');

//app.use(express.static('images'));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

// Ensure data directory and tasks file exist
async function ensureTasksFile() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(TASKS_FILE);
  } catch {
    await fs.writeFile(TASKS_FILE, JSON.stringify([], null, 2));
  }
}

// Helper function to read tasks
async function readTasks() {
  try {
    const fileContent = await fs.readFile(TASKS_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
}

// Helper function to write tasks
async function writeTasks(tasks) {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error writing tasks:', error);
    throw error;
  }
}

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    await ensureTasksFile();
    const tasks = await readTasks();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
});

// GET single task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    await ensureTasksFile();
    const tasks = await readTasks();
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch task', error: error.message });
  }
});

// POST create new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    await ensureTasksFile();
    const tasks = await readTasks();

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      priority: priority || 'Medium',
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
});

// PUT update task
app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, priority, dueDate, completed } = req.body;

    await ensureTasksFile();
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...(title !== undefined && { title: title.trim() }),
      ...(priority !== undefined && { priority }),
      ...(dueDate !== undefined && { dueDate }),
      ...(completed !== undefined && { completed }),
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    await ensureTasksFile();
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);

    res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
});


// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
console.log('Server running on http://localhost:3000');

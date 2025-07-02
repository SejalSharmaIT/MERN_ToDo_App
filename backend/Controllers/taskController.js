const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

// Helper to extract user ID from token
const getUserId = (req) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, 'secret');
    return decoded.userId;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: getUserId(req) });
    res.json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.addTask = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: 'Task text is required' });

    const task = await Task.create({ userId, text, completed: false });
    res.status(201).json(task);
  } catch (err) {
    console.error("Add Task Error:", err);
    res.status(500).json({ message: 'Failed to add task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update Task Error:", err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error("Delete Task Error:", err);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

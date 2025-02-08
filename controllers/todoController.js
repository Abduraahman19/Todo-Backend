const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');

const createTodo = async (req, res) => {
  const { title, description, date, backgroundColor, list } = req.body;

  const token = req.headers.authorization.split(' ')[1];


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const todo = new Todo({
      title,
      description,
      date,
      backgroundColor,
      list,
      userId,
    });

    await todo.save();
    res.status(201).json({ message: 'To-do created successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getTodos = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const todos = await Todo.find({ userId });
    res.status(200).json({ message: 'To-dos fetched successfully', todos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res.status(404).json({ message: 'To-do not found or not authorized' });
    }

    res.status(200).json({ message: 'To-do fetched successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, backgroundColor, list } = req.body;
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { title, description, date, backgroundColor, list },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'To-do not found or not authorized' });
    }

    res.status(200).json({ message: 'To-do updated successfully', updatedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: 'To-do not found or not authorized' });
    }

    res.status(200).json({ message: 'To-do deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};

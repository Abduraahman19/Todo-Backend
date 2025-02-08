const express = require('express');
const router = express.Router();
const { 
  createTodo, 
  updateTodo, 
  getTodos, 
  deleteTodo, 
  getTodoById
} = require('../controllers/todoController');

router.post('/todo', createTodo); 

router.put('/todo/:id', updateTodo); 

router.get('/todos', getTodos); 

router.get('/gettodo/:id', getTodoById); 

router.delete('/todo/:id', deleteTodo); 

module.exports = router;

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  backgroundColor: { type: String, default: '#ffffff' },
  userId: { type: String, required: true },
  list: { type: String, required: true },
});

module.exports = mongoose.model('Todo', todoSchema);

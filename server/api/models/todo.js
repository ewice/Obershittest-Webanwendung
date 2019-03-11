const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  label: String,
  status: Boolean,
  position: Number
});

module.exports = mongoose.model('Todo', todoSchema);

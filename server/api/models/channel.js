const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: String,
  title: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Channel', channelSchema);


const mongoose = require('mongoose');
var Movie = mongoose.model('Movies', {
  name: String,
  director: String,
  link: String,
  date: Number,
  screening: [String]
});

module.exports = {Movie};

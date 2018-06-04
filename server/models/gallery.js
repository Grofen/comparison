const mongoose = require('mongoose');
var Gallery = mongoose.model('Gallery', {
  imgUrl: String
});

module.exports = {Gallery};

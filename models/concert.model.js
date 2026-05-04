const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  performer: String,
  genre: String,
  price: Number,
  day: Number,
  image: String
});

module.exports = mongoose.model('Concert', concertSchema);
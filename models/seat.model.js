const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  day: Number,
  seat: Number,
  client: String,
  email: String
});

module.exports = mongoose.model('Seat', seatSchema);
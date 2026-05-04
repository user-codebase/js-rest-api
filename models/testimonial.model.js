const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: String,
  text: String
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
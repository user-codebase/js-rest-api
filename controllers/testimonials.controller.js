const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    const items = await Testimonial.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);

    const item = await Testimonial.findOne().skip(rand);

    res.json(item || {});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    res.json(item || {});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const newItem = new Testimonial(req.body);
    await newItem.save();

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Testimonial.findById(req.params.id);

    if (item) {
      item.author = req.body.author;
      item.text = req.body.text;
      await item.save();
    }

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
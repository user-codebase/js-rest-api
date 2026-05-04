const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Concert.findById(req.params.id);
    res.json(item || {});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const newConcert = new Concert(req.body);
    await newConcert.save();

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Concert.findById(req.params.id);

    if (item) {
      Object.assign(item, req.body);
      await item.save();
    }

    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    await Concert.findByIdAndDelete(req.params.id);

    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};
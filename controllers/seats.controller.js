const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Seat.findById(req.params.id);
    res.json(item || {});
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    if (!day || !seat || !client || !email) {
      return res.status(400).json({
        message: 'Missing data'
      });
    }

    const isTaken = await Seat.findOne({ day, seat });

    if (isTaken) {
      return res.status(409).json({
        message: 'The slot is already taken...'
      });
    }

    const newSeat = new Seat({
      day,
      seat,
      client,
      email
    });

    await newSeat.save();

    const seats = await Seat.find();
    req.io.emit('seatsUpdated', seats);

    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Seat.findById(req.params.id);

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
    await Seat.findByIdAndDelete(req.params.id);

    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};
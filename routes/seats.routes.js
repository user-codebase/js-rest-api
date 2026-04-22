const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.seats);
});

router.get('/:id', (req, res) => {
  const item = db.seats.find(el => el.id === Number(req.params.id));
  res.json(item || {});
});

// router.post('/', (req, res) => {
//   db.seats.push(req.body);
//   res.json({ message: 'OK' });
// });

router.post('/', (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({
      message: 'Missing data'
    });
  }

  const isTaken = db.seats.some(
    item => item.day === day && item.seat === seat
  );

  if (isTaken) {
    return res.status(409).json({
      message: 'The slot is already taken...'
    });
  }

  const newSeat = {
    id: db.seats.length + 1,
    day,
    seat,
    client,
    email
  };

  db.seats.push(newSeat);

  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const item = db.seats.find(el => el.id === Number(req.params.id));

  if (item) {
    Object.assign(item, req.body);
  }

  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const index = db.seats.findIndex(el => el.id === Number(req.params.id));

  if (index !== -1) db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
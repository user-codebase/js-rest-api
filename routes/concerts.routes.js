const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.concerts);
});

router.get('/:id', (req, res) => {
  const item = db.concerts.find(el => el.id === Number(req.params.id));
  res.json(item || {});
});

router.post('/', (req, res) => {
  db.concerts.push(req.body);
  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const item = db.concerts.find(el => el.id === Number(req.params.id));

  if (item) {
    Object.assign(item, req.body);
  }

  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const index = db.concerts.findIndex(el => el.id === Number(req.params.id));

  if (index !== -1) db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.testimonials);
});

router.get('/random', (req, res) => {
  const items = db.testimonials;
  const item = items[Math.floor(Math.random() * items.length)];
  res.json(item || {});
});

router.get('/:id', (req, res) => {
  const item = db.testimonials.find(el => el.id === Number(req.params.id));
  res.json(item || {});
});

router.post('/', (req, res) => {
  db.testimonials.push({
    id: uuidv4(),
    ...req.body,
  });

  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const item = db.testimonials.find(el => String(el.id) === req.params.id);

  if (item) {
    item.author = req.body.author;
    item.text = req.body.text;
  }

  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const index = db.testimonials.findIndex(el => String(el.id) === req.params.id);

  if (index !== -1) db.testimonials.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
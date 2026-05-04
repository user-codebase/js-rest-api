const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controller');

router.get('/', ConcertsController.getAll);
router.get('/:id', ConcertsController.getById);

router.post('/', ConcertsController.create);
router.put('/:id', ConcertsController.update);
router.delete('/:id', ConcertsController.remove);

module.exports = router;
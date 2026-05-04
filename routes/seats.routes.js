const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/seats.controller');

router.get('/', SeatsController.getAll);
router.get('/:id', SeatsController.getById);

router.post('/', SeatsController.create);
router.put('/:id', SeatsController.update);
router.delete('/:id', SeatsController.remove);

module.exports = router;
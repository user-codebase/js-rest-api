const express = require('express');
const router = express.Router();

const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/', TestimonialsController.getAll);
router.get('/random', TestimonialsController.getRandom);
router.get('/:id', TestimonialsController.getById);

router.post('/', TestimonialsController.create);
router.put('/:id', TestimonialsController.update);
router.delete('/:id', TestimonialsController.remove);

module.exports = router;
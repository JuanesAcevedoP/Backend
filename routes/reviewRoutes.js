const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviews
} = require('../controllers/reviewController');

// Ruta pública para crear reseñas
router.post('/', createReview);

// Ruta pública para obtener reseñas
router.get('/', getReviews);

module.exports = router;

const express = require('express');
const router = express.Router();
const { upload, uploadMiddleware } = require('../config/multerConfig');

const {
  createProperty,
  getAllProperties,
  getFeaturedProperties,
  getPropertyByCode,
  deleteProperty,
  updateProperty,
} = require('../controllers/propertyController');

const { protect } = require('../middlewares/authMiddleware');

// Públicas
router.get('/', getAllProperties);
router.get('/featured', getFeaturedProperties);
router.get('/:code', getPropertyByCode);

// Crear propiedad (ya NO se sube imagen aquí)
router.post('/create', protect, createProperty);

// Actualizar propiedad (opcionalmente puede cambiar imagen)
router.put(
  '/:id',
  protect,
  updateProperty
);

router.delete('/:id', protect, deleteProperty);

module.exports = router;
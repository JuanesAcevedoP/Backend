const express = require('express');
const router = express.Router();
const { upload, uploadMiddleware } = require('../config/multerConfig');
const ExcelJS = require('exceljs');
const Property = require('../models/Property');

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

// Exportar propiedades a Excel
router.get('/export', protect, async (req, res) => {
  try {
    const properties = await Property.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Propiedades');

    // Encabezados
    worksheet.columns = [
      { header: 'Código', key: 'code', width: 15 },
      { header: 'Título', key: 'title', width: 30 },
      { header: 'Tipo', key: 'type', width: 15 },
      { header: 'Precio', key: 'price', width: 15 },
      { header: 'Habitaciones', key: 'bedrooms', width: 15 },
      { header: 'Baños', key: 'bathrooms', width: 15 },
      { header: 'Área', key: 'area', width: 10 },
      { header: 'Ciudad', key: 'city', width: 20 },
      { header: 'Sector', key: 'sector', width: 20 },
      { header: 'Ubicación', key: 'location', width: 30 },
      { header: 'Disponible', key: 'available', width: 12 },
      { header: 'Destacada', key: 'featured', width: 12 },
      { header: 'Arriendo', key: 'rent', width: 12 },
      { header: 'WhatsApp Asesor', key: 'advisorWhatsapp', width: 20 },
      { header: 'URL Imagen', key: 'image', width: 40 },
    ];

    // Agregar filas
    properties.forEach((property) => {
      worksheet.addRow({
        code: property.code,
        title: property.title,
        type: property.type,
        price: property.price,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        city: property.city,
        sector: property.sector,
        location: property.location,
        available: property.available ? 'Sí' : 'No',
        featured: property.featured ? 'Sí' : 'No',
        rent: property.rent ? 'Sí' : 'No',
        advisorWhatsapp: property.advisorWhatsapp,
        image: property.image,
      });
    });

    // Encabezados de respuesta
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=propiedades.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('❌ Error al exportar propiedades:', error);
    res.status(500).json({ message: 'Error al exportar propiedades' });
  }
});


module.exports = router;
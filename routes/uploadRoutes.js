const express = require('express');
const router = express.Router();
const { upload, uploadToStorj, generateSignedUrl } = require('../config/multerConfig');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ningún archivo' });
    }

    const cleanName = req.file.originalname
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .toLowerCase();

    const fileName = `${Date.now()}-${cleanName}`;

    const result = await uploadToStorj(req.file.buffer, fileName, req.file.mimetype);

    // ✅ Generar URL firmada
    const signedUrl = await generateSignedUrl(result.Key);

    res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    res.status(500).json({ message: 'Error al subir la imagen' });
  }
});

module.exports = router;

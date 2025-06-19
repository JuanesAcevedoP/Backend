// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const { upload, uploadToStorj } = require('../config/multerConfig');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No se recibió ningún archivo' });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const result = await uploadToStorj(req.file.buffer, fileName, req.file.mimetype);

    const imageUrl = `https://link.storjshare.io/raw/${upload.Bucket}/${upload.Key}`;
    res.status(200).json({ url: imageUrl });

  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    res.status(500).json({ message: 'Error al subir la imagen' });
  }
});

module.exports = router;

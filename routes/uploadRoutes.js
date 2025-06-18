const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const { protect } = require('../middlewares/authMiddleware');

router.post('/upload-image', protect, upload.single('image'), (req, res) => {
  if (!req.file || !req.file.key || !req.file.bucket) {
    return res.status(400).json({ message: 'No se pudo subir la imagen' });
  }

  const imageUrl = `https://gateway.storjshare.io/${req.file.bucket}/${req.file.key}`;

  res.status(200).json({ url: imageUrl });
});
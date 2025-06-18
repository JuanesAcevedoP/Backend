const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const { protect } = require('../middlewares/authMiddleware');

router.post('/upload-image', protect, upload.single('image'), (req, res) => {
  if (!req.file || !req.file.location) {
    return res.status(400).json({ message: 'No se pudo subir la imagen' });
  }

  res.status(200).json({ url: req.file.location });
});

module.exports = router;

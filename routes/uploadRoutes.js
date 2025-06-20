const express = require("express");
const router = express.Router();
const { upload } = require("../config/multerConfig");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: "No se pudo subir la imagen" });
  }

  res.status(200).json({ url: req.file.path });
});

module.exports = router;

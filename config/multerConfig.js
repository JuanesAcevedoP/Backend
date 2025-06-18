const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');

// Configuración de S3Client compatible con AWS SDK v3
const s3 = new S3Client({
  region: 'eu1', // Región de tu Gateway
  endpoint: 'https://gateway.storjshare.io', // Endpoint de Storj
  credentials: {
    accessKeyId: process.env.STORJ_ACCESS_KEY,
    secretAccessKey: process.env.STORJ_SECRET_KEY,
  },
  forcePathStyle: true, // ⚠️ importante para Storj
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.STORJ_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: function (req, file, cb) {
      const fileName = Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  }),
});

const uploadMiddleware = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Imagen requerida' });
  }
  next();
};

module.exports = { upload, uploadMiddleware };

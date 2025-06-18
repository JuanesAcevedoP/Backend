const AWS = require("aws-sdk");
const multer = require("multer");

// Cliente S3 usando Gateway de Storj
const s3 = new AWS.S3({
  accessKeyId: process.env.STORJ_ACCESS_KEY,
  secretAccessKey: process.env.STORJ_SECRET_KEY,
  region: "eu1", // Región simulada para Storj
  endpoint: "https://gateway.eu1.storjshare.io", // Gateway oficial o personalizado
  signatureVersion: "v4",
  s3ForcePathStyle: true, // Muy importante para compatibilidad con Storj
});

// multer en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Función para subir el archivo manualmente
const uploadToStorj = (buffer, filename, mimetype) => {
  const params = {
    Bucket: "properties-image",
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
    ACL: "public-read",
  };

  return s3.upload(params).promise();
};

module.exports = { upload, uploadToStorj };

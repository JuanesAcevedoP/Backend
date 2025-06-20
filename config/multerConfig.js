const AWS = require("aws-sdk");
const multer = require("multer");

const s3 = new AWS.S3({
  accessKeyId: process.env.STORJ_ACCESS_KEY,
  secretAccessKey: process.env.STORJ_SECRET_KEY,
  region: "eu1",
  endpoint: "https://gateway.eu1.storjshare.io",
  signatureVersion: "v4",
  s3ForcePathStyle: true,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToStorj = (buffer, filename, mimetype) => {
  const params = {
    Bucket: process.env.STORJ_BUCKET,
    Key: filename,
    Body: buffer,
    ContentType: mimetype,
  };

  return s3.upload(params).promise();
};

// ✅ NUEVO: generar URL firmada
const generateSignedUrl = (key) => {
  const params = {
    Bucket: process.env.STORJ_BUCKET,
    Key: key,
    Expires: 60 * 60, // 1 hora
  };

  return s3.getSignedUrlPromise('getObject', params);
};

module.exports = { upload, uploadToStorj, generateSignedUrl };

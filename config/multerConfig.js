const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu1", // Asegúrate de que la región sea correcta para tu Gateway Storj
  endpoint: "https://gateway.storjshare.io", // o tu endpoint personalizado
  signatureVersion: "v4"
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "properties-image",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  })
});

module.exports = { upload };

let multer = require("multer");
let path = require("path");

let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    if (file) {
      cb(
        null,
        new Date().toISOString().split(":").join("-") + file.originalname
      );
    } else {
      cb(null, false);
    }
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  },
  //   limits: { fileSize: 1024 * 1024 },
});

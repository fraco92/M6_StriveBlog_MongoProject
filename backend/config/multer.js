const multer = require("multer");
const { v2 } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary")

// Configuration
export default multer({
  storage: new CloudinaryStorage({
    v2,
    params: {
      folder: "soluzioni",
    },
  }),
}).single("avatar")


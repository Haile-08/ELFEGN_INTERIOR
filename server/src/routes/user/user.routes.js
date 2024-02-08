const express = require("express");
const multer = require("multer");
const path = require("path");
const userAuth = require("../../middleware/userAuth");

const {
  handleUpdateUser,
  handleimageUpload,
  handleFetchUser,
} = require("../../controller/user.constroller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/userPhoto");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();
//taken
router.put("/update/:id", userAuth, handleUpdateUser);
//taken
router.post("/upload", upload.single("image"), userAuth, handleimageUpload);
//taken
router.get("/get/:id", handleFetchUser);


module.exports = router;

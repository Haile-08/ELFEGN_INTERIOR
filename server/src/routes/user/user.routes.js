const express = require("express");
const multer = require("multer");
const path = require("path");
const buyerAuth = require("../../middleware/buyerAuth");
const sellerAuth = require("../../middleware/sellerAuth");

const {
  handleUpdateUser,
  handleimageUpload,
  handleFetchUser,
  handleUserType,
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

router.put("/update/:id", buyerAuth, handleUpdateUser);
router.put("/update/seller/:id", sellerAuth, handleUpdateUser);
router.post("/upload", upload.single("image"), buyerAuth, handleimageUpload);
router.post(
  "/upload/seller",
  upload.single("image"),
  sellerAuth,
  handleimageUpload
);
router.get("/get/:id", handleFetchUser);
router.post("/user/type", handleUserType);


module.exports = router;

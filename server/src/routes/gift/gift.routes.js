const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  handlePostGift,
  handleGetAGift,
  handleGetGifts,
  handleGetAllGifts,
  handleUpdateRating,
  handleGiftDelete,
} = require("../../controller/gift.controller");
const buyerAuth = require("../../middleware/buyerAuth");
const sellerAuth = require("../../middleware/sellerAuth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/gift");
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

router.post("/post", upload.single("gift_image"), sellerAuth, handlePostGift);
router.get("/get", handleGetGifts);
router.get("/get/all", handleGetAllGifts);
router.get("/get/:id", handleGetAGift);
router.post("/rating", buyerAuth, handleUpdateRating);
router.delete("/delete/:id", sellerAuth, handleGiftDelete);

module.exports = router;

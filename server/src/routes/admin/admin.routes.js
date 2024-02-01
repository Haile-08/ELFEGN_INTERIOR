const express = require("express");
const multer = require("multer");
const path = require("path");


const {
  handleBlogCreation,
  handleBlogRetrieve,
  handleRemoveABlog,
  handleCommentRetrieve,
  handleCommentDelete,
} = require("../../controller/blog.controller");

const {
  handleAdminLogin,
  handleAdminDeleteAGift,
  handleAdminGetAllGifts,
  handleWithdrawGet,
  handleWithdrawApproval,
  handleAllNumber,
  handleProductPost,
  handleGetProducts,
  handleProductDelete,
} = require("../../controller/admin.controller");

const {
  handleOrderGet,
  handleOrderDelete,
} = require("../../controller/order.controller");

const adminauthCheck = require("../../middleware/adminauth");

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/Product");
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

const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/blog");
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

const productUpload = multer({ storage: productStorage });
const blogUpload = multer({ storage: blogStorage });
const router = express.Router();


//Auth
router.post("/auth/login", handleAdminLogin);

//Products
router.post("/product/post", productUpload.single("image"), adminauthCheck, handleProductPost)
router.get("/products", handleGetProducts);
router.delete("/delete/:id", adminauthCheck, handleProductDelete);















///////////////////////////////////////////
// Admin Blog
router.post(
  "/blog/post",
  blogUpload.single("image"),
  adminauthCheck,
  handleBlogCreation
);
router.get("/blog/get", adminauthCheck, handleBlogRetrieve);
router.delete("/blog/delete/:id", adminauthCheck, handleRemoveABlog);
router.get("/blog/get/comment/:id", adminauthCheck, handleCommentRetrieve);
router.delete("/blog/delete/comment/:id", adminauthCheck, handleCommentDelete);

// Admin Gift
router.get("/gift/get/all", adminauthCheck, handleAdminGetAllGifts);
router.delete("/gift/delete/:id", adminauthCheck, handleAdminDeleteAGift);

//Admin Orders

router.get("/order/get/all", adminauthCheck, handleOrderGet);
router.delete("/order/delete/:id", adminauthCheck, handleOrderDelete);

//Admin withdraw

router.get("/withdraw/get/all", adminauthCheck, handleWithdrawGet);
router.post("/withdraw/approve", adminauthCheck, handleWithdrawApproval);

router.get("/count", handleAllNumber);
module.exports = router;

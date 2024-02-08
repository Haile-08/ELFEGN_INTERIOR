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
  handleProductPost,
  handleGetProducts,
  handleProductDelete,
  handleDashBoardCount,
} = require("../../controller/admin.controller");


const adminauthCheck = require("../../middleware/adminauth");
const { handleOrderVerification, handleDeliveredOrderGetPaginate, handleApproveDelivery, handlePendingOrderGetPaginate } = require("../../controller/order.controller");

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
//taken
router.post("/auth/login", handleAdminLogin);

//Products
//taken
router.post("/product/post", productUpload.single("image"), adminauthCheck, handleProductPost)
//taken
router.get("/products", adminauthCheck, handleGetProducts);
//taken
router.delete("/delete/:id", adminauthCheck, handleProductDelete);


//taken
router.post("/verify", handleOrderVerification);

//taken
router.get("/getdeliveredpagenated/",adminauthCheck, handleDeliveredOrderGetPaginate);
//taken
router.get("/deliver/:id", adminauthCheck, handleApproveDelivery);

//taken
router.get("/getpendingpagenated",adminauthCheck,  handlePendingOrderGetPaginate);

// Admin Blog
//taken
router.post(
  "/blog/post",
  blogUpload.single("image"),
  adminauthCheck,
  handleBlogCreation
);
//taken
router.get("/blog/get", adminauthCheck, handleBlogRetrieve);
//taken
router.delete("/blog/delete/:id", adminauthCheck, handleRemoveABlog);
//taken
router.get("/blog/get/comment/:id", adminauthCheck, handleCommentRetrieve);
//taken
router.delete("/blog/delete/comment/:id", adminauthCheck, handleCommentDelete);

//taken
router.get("/count", adminauthCheck,  handleDashBoardCount)

module.exports = router;

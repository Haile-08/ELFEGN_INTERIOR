const express = require("express");

const {
  handleBlogRetrieve,
  handleRetrieveABlog,
  handleCommentPost,
  handleCommentRetrieve,
} = require("../../controller/blog.controller");

const adminauthCheck = require("../../middleware/adminauth");

const router = express.Router();

// blog

router.get("/posts", handleBlogRetrieve);
router.get("/post/:id", handleRetrieveABlog);

// comment

router.post("/comment", handleCommentPost);
router.get("/comment/:id", handleCommentRetrieve);


module.exports = router;

const Blog = require("../models/blog.models");
const Comment = require("../models/comment.models");

const handleBlogCreation = async (req, res) => {
  try {
    console.log("run");
    const { title, summary, author, content, date } = req.body;
    const { path } = req.file;

    const blog = await Blog.create({
      title,
      summary,
      author,
      image: path,
      content,
      date,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleBlogRetrieve = async (req, res) => {
  try {
    const pageNum = req.query.page || 0;
    const blogPerPage = 2;
    const blog = await Blog.find()
      .skip(pageNum * blogPerPage)
      .limit(blogPerPage);

    const blogList = [];
    blog.forEach((b) => blogList.push(b));
    res.status(201).json({
      message: "blog fetched successfully",
      success: true,  
      blog: blogList,
      hasMore: blogList.length == blogPerPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleRetrieveABlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res
      .status(201)
      .json({ message: "blog fetched successfully", success: true, blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleRemoveABlog = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleCommentPost = async (req, res) => {
  try {
    console.log("run comment");
    const { BlogId, date, user, content, image } = req.body;

    const comment = await Comment.create({
      BlogId,
      date,
      user,
      content,
      image,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, comment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleCommentRetrieve = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.find({
      BlogId: id,
    });
    res
      .status(201)
      .json({ message: "blog fetched successfully", success: true, comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleCommentDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Comment.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  handleBlogCreation,
  handleBlogRetrieve,
  handleRetrieveABlog,
  handleRemoveABlog,
  handleCommentPost,
  handleCommentRetrieve,
  handleCommentDelete,
};

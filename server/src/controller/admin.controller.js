const Admin = require("../models/admin.models");
const Product = require("../models/product.models")
const Blog = require("../models/blog.models");
const Order = require("../models/orders.model");
const jwt = require("jsonwebtoken");

/* Admin Auth*/
const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    const auth = () => password === user.password;
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = jwt.sign({ id: user._id }, process.env.ADMIN_JWT_SECRET);
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* Product */
const handleProductPost = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
    } = req.body;
    const { path } = req.file;

    console.log("name", name);
    console.log("price", price);
    console.log("cata", category);
    console.log("desc", description)
    console.log("image", path)

    await Product.create({
      name,
      image: path,
      price,
      category,
      description,
      star: 0,
      status: true,
      date: new Date().toDateString(),
    });

    res
      .status(201)
      .json({ message: "Product created successfully", success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetProducts = async (req, res) => {
  try {
    const pageNum = req.query.page || 0;
    const productPerPage = 4;
    const product = await Product.find()
      .skip(pageNum * productPerPage)
      .limit(productPerPage);

    const productList = [];
    product.forEach((p) =>  productList.push(p));
    res.status(201).json({
      message: "Product fetched successfully",
      success: true,
      product:  productList,
      hasMore:  productList.length == productPerPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleProductDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the Product" });
  }
};



const handleDashBoardCount = async (req, res) => {
  try {
    const product = await Product.countDocuments();
    const pending = await Order.find({ Delivered: false }).countDocuments();
    const delivered =  await Order.find({ Delivered: true }).countDocuments();
    const blog = await Blog.countDocuments();

    res.status(201).json({
      message: "Count fetched successfully",
      success: true,
      product,
      pending,
      delivered,
      blog,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  handleAdminLogin,
  handleProductPost,
  handleGetProducts,
  handleProductDelete,
  handleDashBoardCount,
};

const Admin = require("../models/admin.models");
const Gift = require("../models/gift.models");
const Withdraw = require("../models/withdraw.models");
const Blog = require("../models/blog.models");
const Order = require("../models/orders.model");
const Balance = require("../models/balance.models");
const Product = require("../models/product.models")
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

/* Admin Gift */
const handleAdminDeleteAGift = async (req, res) => {
  try {
    const id = req.params.id;
    await Gift.findByIdAndDelete(id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleAdminGetAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.status(201).json({
      message: "Gifts fetched successfully",
      success: true,
      gifts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWithdrawGet = async (req, res) => {
  try {
    const withdraws = await Withdraw.find();
    res.status(201).json({
      message: "Gifts fetched successfully",
      success: true,
      withdraws,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWithdrawApproval = async (req, res) => {
  try {
    const { approve, id } = req.body;

    if (approve) {
      await Withdraw.findByIdAndUpdate(id, { Approved: true }, { new: true });
    } else {
      const withdraw = await Withdraw.findByIdAndUpdate(
        id,
        { Decline: true },
        { new: true }
      );
      await Balance.findOneAndUpdate(
        { user_id: withdraw?.seller_id },
        {
          balance: withdraw?.amount,
        },
        { new: true }
      );
    }
    res.status(201).json({
      message: "Approval complete",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleAllNumber = async (req, res) => {
  try {
    const withdraw_num = await Withdraw.find();
    const order_num = await Order.find();
    const gift_num = await Gift.find();
    const blog_num = await Blog.find();

    const count = {
      withdraw: withdraw_num.length,
      order: order_num.length,
      gift: gift_num.length,
      blog: blog_num.length,
    };
    res
      .status(201)
      .json({ message: "successfully get count", success: true, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  handleAdminLogin,
  handleProductPost,
  handleGetProducts,
  handleProductDelete,
  handleAllNumber,
  handleWithdrawGet,
  handleAdminDeleteAGift,
  handleAdminGetAllGifts,
  handleWithdrawApproval,
};

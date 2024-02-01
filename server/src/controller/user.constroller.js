const User = require("../models/user.models");
const Room = require("../models/rooms.models");
const jwt = require("jsonwebtoken");

const handleUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone_number, city, country } = req.body;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName !== "") user.firstName = firstName;
    if (lastName !== "") user.lastName = lastName;
    if (phone_number !== "") user.phone_number = phone_number;
    if (city !== "") user.city = city;
    if (country !== "") user.country = country;
    user.save();
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleimageUpload = async (req, res) => {
  try {
    const { email } = req.body;
    const { path } = req.file;

    const user = await User.findOne({ email });

    user.image = path;

    user.save();
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleFetchUser = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await User.findById(id);
    res
      .status(201)
      .json({ message: "blog fetched successfully", success: true, blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const handleUserType = async (req, res) => {
  try {
    const { is_a_buyer, email } = req.body;
    const user = User.findOne({ email });
    const buyerToken = jwt.sign({ id: user._id }, process.env.BUYER_JWT_SECRET);
    const sellerToken = jwt.sign(
      { id: user._id },
      process.env.SELLER_JWT_SECRET
    );

    const updated_user = await User.findOneAndUpdate(
      { email },
      { is_a_buyer },
      { new: true }
    );
    if (is_a_buyer == true) {
      res.status(201).json({
        message: "user type set successfully",
        success: true,
        is_a_buyer,
        newUser: updated_user,
        token: buyerToken,
      });
    } else {
      res.status(201).json({
        message: "user type set successfully",
        success: true,
        is_a_buyer,
        newUser: updated_user,
        token: sellerToken,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleUpdateUser,
  handleimageUpload,
  handleFetchUser,
  handleUserType,
};
    
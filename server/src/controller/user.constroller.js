const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const handleUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber} = req.body;
    const user = await User.findById(id);
    console.log("phone number", phoneNumber)

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName !== "") user.firstName = firstName;
    if (lastName !== "") user.lastName = lastName;
    if (phoneNumber !== "") user.phoneNumber = phoneNumber;
    
    await user.save();
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
    console.log("email", email);
    console.log("path", path)

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
    const user = await User.findById(id);
    res
      .status(201)
      .json({ message: "user fetched successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  handleUpdateUser,
  handleimageUpload,
  handleFetchUser,
};
    
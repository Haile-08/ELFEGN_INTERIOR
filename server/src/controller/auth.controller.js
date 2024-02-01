const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const Token = require("../models/token.models");
const Balance = require("../models/balance.models");
const sendEmail = require("../utils/email/sendEmail");

/* Register seller */
const handleSignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      country,
      city,
      street,
      email,
      password,
      date,
      is_a_buyer,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    let user;
    if (is_a_buyer) {
      user = await User.create({
        firstName,
        lastName,
        country,
        city,
        street,
        email,
        password: passwordHash,
        date,
        is_a_buyer,
      });
    } else {
      user = await User.create({
        firstName,
        lastName,
        country,
        city,
        street,
        email,
        password: passwordHash,
        date,
        is_a_buyer,
      });
      await Balance.create({
        user_id: user._id,
        balance: 0,
      });
    }
    sendEmail(
      user.email,
      "Gift shop",
      {
        name: user.firstName,
      },
      "./template/wellcome.handlebars"
    );
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Login user */
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const buyerToken = jwt.sign({ id: user._id }, process.env.BUYER_JWT_SECRET);
    const sellerToken = jwt.sign(
      { id: user._id },
      process.env.SELLER_JWT_SECRET
    );

    if (user.is_a_buyer) {
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        user,
        token: buyerToken,
      });
    } else {
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        user,
        token: sellerToken,
      });
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "User does not exist" });
  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `merita.netlify.app/account/page/password/reset/${resetToken}/${user._id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    { name: user.name, link: link },
    "./template/requestPasswordReset.handlebars"
  );
  res.status(201).json({ message: "reset email sent", success: true, link });
};

const resetPassword = async (req, res) => {
  const { userId, token, password } = req.body;

  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    return res.json({ message: "Invalid or expired password reset token" });
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    return res.json({ message: "Invalid or expired password reset token" });
  }
  const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  res.status(201).json({ message: "reset email sent", success: true });
};

const handle0authRegister = async (req, res) => {
  console.log("info");
  console.log(req.user);
  const { is_a_buyer } = req.body;
  console.log(`handle0authRegister ${is_a_buyer}`);
  User.findByIdAndUpdate(req.user._id, { is_a_buyer }, { new: true })
    .then((updatedItem) => {
      console.log("Updated item:", updatedItem);
    })
    .catch((error) => {
      console.error("Error updating item:", error);
    });
};

const handleLogout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error("Error during logout:", err);
    } else {
      res.redirect("https://merita.netlify.app/login");
    }
  });
};

const handleGetUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const auser = await User.findById(id);
    res
      .status(201)
      .json({ message: "user fetched successfully", success: true, auser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleSignUp,
  handleLogin,
  requestPasswordReset,
  resetPassword,
  handleLogout,
  handle0authRegister,
  handleGetUserInfo,
};

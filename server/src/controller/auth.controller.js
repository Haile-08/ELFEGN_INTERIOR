const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const Token = require("../models/token.models");
const sendEmail = require("../utils/email/sendEmail");

/* Register seller */
const handleSignUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: passwordHash,
    });
    
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

    const userToken = jwt.sign({ id: user._id }, process.env.USER_JWT_SECRET);
    
    res.status(201).json({
        message: "User logged in successfully",
        success: true,
        user,
        token: userToken,
    });
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

const handleLogout = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error("Error during logout:", err);
    } else {
      res.redirect("http://localhost:5173/account/login");
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
  handleGetUserInfo,
};

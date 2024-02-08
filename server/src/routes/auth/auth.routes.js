const express = require("express");
const passport = require("passport");
const userAuth = require("../../middleware/userAuth");
const jwt = require("jsonwebtoken");

const {
  handleLogin,
  handleSignUp,
  requestPasswordReset,
  resetPassword,
  handleLogout,
  handleGetUserInfo,
} = require("../../controller/auth.controller");

const router = express.Router();

//taken
router.post("/signup", handleSignUp);
//taken
router.post("/login", handleLogin);
//taken
router.post("/requestResetPassword", requestPasswordReset);
//taken
router.post("/resetPassword", resetPassword);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/account/login",
  }),
  (req, res) => {
    const userToken = jwt.sign(
      { id: req.user._id },
      process.env.USER_JWT_SECRET
    );
    console.log(userToken)
    res.redirect(
        `http://localhost:5173/buyerpage/shop?user=${userToken}&id=${req.user._id}`
    );
  }
);
//taken
router.get("/logout", userAuth, handleLogout);
router.get("/user/:id", handleGetUserInfo);

module.exports = router;

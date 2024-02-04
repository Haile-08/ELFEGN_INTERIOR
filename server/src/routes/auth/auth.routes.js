const express = require("express");
const passport = require("passport");
const buyerAuth = require("../../middleware/buyerAuth");
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

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/requestResetPassword", requestPasswordReset);
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
        `http://localhost:5173/buyerpage/shop?tokenid=${userToken}`
    );
  }
);
router.get("/logout", buyerAuth, handleLogout);
router.get("/user/:id", handleGetUserInfo);

module.exports = router;

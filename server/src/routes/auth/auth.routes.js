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
  handle0authRegister,
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
    failureRedirect: "https://merita.netlify.app/account/login",
  }),
  (req, res) => {
    console.log("redirect");
    const buyerToken = jwt.sign(
      { id: req.user._id },
      process.env.BUYER_JWT_SECRET
    );
    const sellerToken = jwt.sign(
      { id: req.user._id },
      process.env.SELLER_JWT_SECRET
    );
    if (req.user.is_a_buyer == true) {
      res.redirect(
        `https://merita.netlify.app/auth/loading/${req.user._id.toString()}/${buyerToken}/true`
      );
    }
    if (req.user.is_a_buyer == false) {
      res.redirect(
        `https://merita.netlify.app/auth/loading/${req.user._id.toString()}/${sellerToken}/false`
      );
    }
    if (req.user.is_a_buyer == undefined) {
      //change url
      res.redirect(
        `https://merita.netlify.app/account/page/type/${req.user._id.toString()}/${
          req.user.email
        }`
      );
    }
  }
);

router.post("/0authRegister", handle0authRegister);
router.get("/logout", buyerAuth, handleLogout);
router.get("/user/:id", handleGetUserInfo);

module.exports = router;

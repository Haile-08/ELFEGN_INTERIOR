const express = require("express");
const {
  handleBankList,
  handleWithdrawRequest,
  handleRequestList,
  handleWithdrawAccept,
  handleWithdrawVerification,
  handleGetBalance,
} = require("../../controller/withdraw.controller");
const sellerAuth = require("../../middleware/sellerAuth");

const router = express.Router();

router.get("/banklist", handleBankList);
router.post("/requestwithdraw", sellerAuth, handleWithdrawRequest);
router.get("/requestlist/:id", sellerAuth, handleRequestList);
router.post("/accept", sellerAuth, handleWithdrawAccept);
router.post("/verify", handleWithdrawVerification);
router.get("/balance/:id", sellerAuth, handleGetBalance);
module.exports = router;

const express = require("express");
const {
  handleOrderCreate,
  handleOrderVerification,
  handleOrderGet,
  handleOrderGetPaginate,
  handlePendingOrderGetPaginate,
  handleDeliveredOrderGetPaginate,
  handleApproveDelivery,
} = require("../../controller/order.controller");
const buyerAuth = require("../../middleware/buyerAuth");

const router = express.Router();

router.post("/create", handleOrderCreate);
router.post("/verify", handleOrderVerification);
router.get("/get", handleOrderGet);
router.get("/getpagenated", handleOrderGetPaginate);
router.get("/getpendingpagenated", handlePendingOrderGetPaginate);
router.get("/getdeliveredpagenated/", handleDeliveredOrderGetPaginate);
router.get("/deliver/:id", handleApproveDelivery);

module.exports = router;

const express = require("express");
const {
  handleOrderCreate,
  handleOrderVerification,
  handleOrderGet,
  handleOrderGetPaginate,
  handleOrderApprove,
  handleOrderDelete,
} = require("../../controller/order.controller");
const buyerAuth = require("../../middleware/buyerAuth");

const router = express.Router();

router.post("/create", handleOrderCreate);
router.post("/verify", handleOrderVerification);
router.get("/get", handleOrderGet);
router.get("/getpagenated", handleOrderGetPaginate);
router.post("/approve", buyerAuth, handleOrderApprove);
router.delete("/delete/:id", buyerAuth, handleOrderDelete);
module.exports = router;

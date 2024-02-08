const express = require("express");
const {
  handleOrderCreate,
  handleOrderVerification,
  handleOrderGet,
  handleOrderGetPaginate,
} = require("../../controller/order.controller");
const userAuth = require("../../middleware/userAuth");

const router = express.Router();

//taken
router.post("/create", handleOrderCreate);
//taken
router.post("/verify", handleOrderVerification);
//taken
router.get("/get", handleOrderGet);
//taken
router.get("/getpagenated", userAuth, handleOrderGetPaginate);


module.exports = router;

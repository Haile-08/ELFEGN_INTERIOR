const express = require("express");

const buyerAuth = require("../../middleware/buyerAuth");
const { handleGetAllProduct, handleGetAProduct, handleUpdateRating } = require("../../controller/product.controller");

const router = express.Router();

router.get("/get", handleGetAllProduct);
router.get("/get/:id", handleGetAProduct);
router.post("/rating", handleUpdateRating)

module.exports = router;

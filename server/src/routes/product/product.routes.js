const express = require("express");

const userAuth = require("../../middleware/userAuth");
const { handleGetAllProduct, handleGetAProduct, handleUpdateRating } = require("../../controller/product.controller");

const router = express.Router();

//taken
router.get("/get", handleGetAllProduct);
//taken
router.get("/get/:id", handleGetAProduct);
//taken
router.post("/rating", userAuth, handleUpdateRating);

module.exports = router;

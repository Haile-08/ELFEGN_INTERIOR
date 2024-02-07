const express = require("express");

const auth = require("./auth/auth.routes");
const blog = require("./blog/blog.routes");
const user = require("./user/user.routes");
const gift = require("./gift/gift.routes");
const order = require("./order/order.routes");
const admin = require("./admin/admin.routes");
const product = require("./product/product.routes")

const api = express.Router();

api.use("/auth", auth);
api.use("/admin", admin);
api.use("/blog", blog);
api.use("/user", user);
api.use("/gift", gift);
api.use("/order", order);
api.use("/product", product)

module.exports = api;

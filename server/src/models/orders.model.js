const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  FirstName: {
    type: String,
    min: 1,
  },
  LastName: {
    type: String,
    min: 1,
  },
  Email: {
    type: String,
    min: 1,
  },
  PhoneNumber: {
    type: String,
  },
  KefleKetema: {
    type: String,
    min: 1,
  },
  FriendlyPlace: {
    type: String,
    min: 1,
  },
  Amount: {
    type: Number,
  },
  ProductId: {
    type: String,
    min: 1,
  },
  BuyerId: {
    type: String,
    min: 1,
  },
  ProductName: {
    type: String,
    min: 1,
  },
  ProductImage: {
    type: String,
  },
  tx_ref: {
    type: String,
  },
  PayemntVerify: {
    type: Boolean,
    min: 1,
  },
  Delivered: {
    type: Boolean,
    min: 1,
  },
  OrderDate: {
    type: String,
    min: 1,
  },

});

module.exports = mongoose.model("order", orderSchema);

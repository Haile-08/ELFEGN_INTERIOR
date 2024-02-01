const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  productId: {
    type: String,
    require: true,
  },
  roomId: {
    type: String,
    min: 1,
    unique: true,
    require: true,
  },
  buyer: {
    type: String,
    min: 1,
  },
  seller: {
    type: String,
    min: 1,
  },
  buyerId: {
    type: String,
    min: 1,
    require: true,
  },
  sellerId: {
    type: String,
    min: 1,
    require: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);

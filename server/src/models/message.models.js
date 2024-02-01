const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  roomId: {
    type: String,
  },
  message: {
    type: String,
    min: 1,
  },
  sender: {
    type: String,
    min: 1,
  },
  senderId: {
    type: String,
    min: 1,
  },
});

module.exports = mongoose.model("Message", messageSchema);

const express = require("express");
const {
  handleGetRooms,
  handleChatFetch,
  handleGetImage,
} = require("../../controller/chat.controller");

const router = express.Router();

router.get("/rooms", handleGetRooms);
router.get("/message/:id", handleChatFetch);
router.get("/image/:id", handleGetImage);

module.exports = router;

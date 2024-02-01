const Room = require("../models/rooms.models");
const Message = require("../models/message.models");
const User = require("../models/user.models");

const handleGetRooms = async (req, res) => {
  try {
    const room = await Room.find();
    res.status(201).json({ room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleChatFetch = async (req, res) => {
  try {
    const id = req.params.id;
    const messages = await Message.find({ roomId: id });
    res.status(201).json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetImage = async (req, res) => {
  try {
    const id = req.params.id;
    const photo = await User.findById(id);
    console.log(photo.image);
    res
      .status(201)
      .json({
        photos: photo.image,
        name: photo.firstName + " " + photo.lastName,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { handleGetRooms, handleChatFetch, handleGetImage };

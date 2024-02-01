const Room = require("../models/rooms.models");
const Message = require("../models/message.models");

let onlineUsers = [];

const sockets = (socket) => {
  socket.on("room", async ({ roomId, buyer, seller, buyerId, sellerId }) => {
    const id = roomId || "";
    const room = await Room.findOne({ roomId: id });
    if (!room) {
      console.log(`create new room ${roomId}`);
      await Room.create({
        roomId,
        buyer,
        seller,
        buyerId,
        sellerId,
      });
    }
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-online");
    console.log("connected");
  });

  socket.on("online", async ({ newUserId }) => {
    console.log("new user", newUserId);
    if (!onlineUsers.some((user) => user.userId === newUserId)) {
      onlineUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("new user is here!", onlineUsers);
    }
    socket.emit("get-online", onlineUsers);
    console.log("user connected", onlineUsers);
  });

  socket.on("send-message", async ({ message, sender, roomId, senderId }) => {
    console.log("message sent");
    console.log("send message id", senderId);
    await Message.create({
      roomId,
      message,
      sender,
      senderId,
    }).then(() => {
      socket.broadcast.to(roomId).emit("message-from-server", {
        roomId,
        message,
        sender,
        senderId,
      });
      console.log(message);
    });
  });
  socket.on("typing-started", async ({ roomId }) => {
    socket.broadcast.to(roomId).emit("typing-started-from-server");
  });
  socket.on("typing-stoped", async ({ roomId }) => {
    socket.broadcast.to(roomId).emit("typing-stoped-from-server");
  });

  socket.on("disconnect", async () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("user disconnected", onlineUsers);
    socket.emit("get-online", onlineUsers);
  });
};

module.exports = sockets;

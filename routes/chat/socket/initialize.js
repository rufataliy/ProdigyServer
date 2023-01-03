const { io, redis } = require("../../../server");
const { getChats, removeChat } = require("../chatController");
const { getMessages } = require("../messageController");
const { messageHandler } = require("../messageHandler");
const { chatHandler } = require("../chatHandler");
const { getUserIdFromCookie } = require("../utils");
const sendEmail = require("../../../tools/sendEmail");

const initSocket = () => {
  const chat = io.of("/chat");
  chat.on("connection", async (socket) => {
    const user = getUserIdFromCookie(socket.request.headers.cookie);
    redis.set(user._id, socket.id, (err, ok) => {
      if (err) console.log(err);
      console.log("chat connected");
    });

    socket.on("message", (msg, callback) => {
      if (user.sample) {
        sendEmail(msg);
      }
      messageHandler(msg, user._id, callback);
    });

    socket.on("newChat", (data, callback) => {
      chatHandler(data, user._id, callback);
    });

    socket.on("removeChat", async (chatid, callback) => {
      await removeChat({ chatid, userId: user._id });
      const chats = await getChats(user._id);
      chat.to(socket.id).emit("chats", chats);
      callback();
    });

    const chats = await getChats(user._id);
    chat.to(socket.id).emit("chats", chats);

    socket.on("messages", async (chatid) => {
      const messages = await getMessages(chatid, user._id);
      chat.to(socket.id).emit("messages", messages);
    });
  });
};

module.exports.initSocket = initSocket;

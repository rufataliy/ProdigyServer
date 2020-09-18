const { io, redis } = require("../../../server");
const { getChats, removeChat } = require("../chatController");
const { getMessages } = require("../messageController");
const { messageHandler } = require("../messageHandler");
const { chatHandler } = require("../chatHandler");
const { getUserIdFromCookie } = require("../utils");

const initSocket = () => {
  const chat = io.of("/chat");
  chat.on("connection", async (socket) => {
    console.log("chat connected");
    const userid = await getUserIdFromCookie(socket.request.headers.cookie);
    redis.set(userid, socket.id, (err, ok) => {
      if (err) console.log(err);
    });

    socket.on("message", (msg, callback) => {
      messageHandler(msg, userid, callback);
    });

    socket.on("newChat", (data, callback) => {
      chatHandler(data, userid, callback);
    });

    socket.on("removeChat", async (chatid, callback) => {
      await removeChat({ chatid, userid });
      const chats = await getChats(userid);
      chat.to(socket.id).emit("chats", chats);
      callback();
    });

    const chats = await getChats(userid);
    chat.to(socket.id).emit("chats", chats);

    socket.on("messages", async (chatid) => {
      const messages = await getMessages(chatid, userid);
      chat.to(socket.id).emit("messages", messages);
    });
  });
};

module.exports.initSocket = initSocket;

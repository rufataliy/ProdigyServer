const { redis, io } = require("../../server");
const { addMessageToChat, createNewChat } = require("./chatController");
const { saveMessage } = require("./messageController");

const chatHandler = async (data, userid, callback) => {
  const { chat, message } = data;
  const { _id: chatId } = await createNewChat(chat, userid);
  message.chatId = chatId;
  const savedMessage = await saveMessage(message, userid);
  const updatedChat = await addMessageToChat({
    chatId,
    messageId: savedMessage._id,
  });
  broadcastToNewChat({ chat: updatedChat, message: savedMessage });
  callback(chatId);
};

function broadcastToNewChat({ chat, message }) {
  chat.participants.map((participant) => {
    redis.get(participant.toString(), (err, id) => {
      io.of("/chat").to(id).emit(`newChat`, { chat, message });
    });
  });
}

module.exports.chatHandler = chatHandler;

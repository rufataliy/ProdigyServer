const { saveMessage } = require("./messageController");
const { addMessageToChat } = require("./chatController");
const { io, redis } = require("../../server");

const messageHandler = async (incomingMessage, userid, callback) => {
  const message = await saveMessage(incomingMessage, userid);
  const { chatId, _id: messageId } = message;
  const { participants } = await addMessageToChat({ chatId, messageId });
  emitMessageToParticipants({ participants, message });
  callback();
};

function emitMessageToParticipants({ participants, message }) {
  participants.map((participant) => {
    redis.get(participant.toString(), (err, id) => {
      io.of("/chat")
        .to(id)
        .emit(`message`, { ...message.toObject() });
    });
  });
}

module.exports.messageHandler = messageHandler;

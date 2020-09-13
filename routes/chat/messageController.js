const Message = require("../../models/Message");
const Chat = require("../../models/Chat");
const ObjectId = require("mongoose").Types.ObjectId;

async function saveMessage(message, userid) {
  const { content, chatId } = message;

  const savedMessage = await Message.findOneAndUpdate(
    { _id: ObjectId() },
    { author: userid, chatId, content },
    {
      upsert: true,
      new: true,
      populate: {
        path: "author",
        select: ["name", "_id"],
      },
    }
  ).then((doc) => doc);

  return savedMessage;
}

async function getMessages(chatid, userid) {
  const messages = await Chat.findOne(
    { participants: userid, _id: chatid },
    { select: "messages" }
  )
    .populate({ path: "messages", populate: "author" })
    .then((messages) => messages)
    .catch((err) => console.log(err));
  return messages;
}

async function removeMessagesByChatId(chatId) {
  await Message.deleteMany({ chatId })
    .then((res) => res)
    .catch((err) => console.log(err));
}

module.exports = {
  getMessages,
  saveMessage,
  removeMessagesByChatId,
};

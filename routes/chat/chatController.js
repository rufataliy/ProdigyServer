const Chat = require("../../models/Chat");
const { removeMessagesByChatId } = require("./messageController");
const ObjectId = require("mongoose").Types.ObjectId;

async function createNewChat(chat, userid) {
  const { title, participants } = chat;
  const newChat = await Chat.findOneAndUpdate(
    { _id: ObjectId() },
    {
      $push: {
        participants: { $each: participants },
      },
      title,
      author: userid,
    },
    { upsert: true, new: true }
  ).then((newChat) => newChat);

  return newChat;
}

async function addMessageToChat({ chatId, messageId }) {
  const savedChat = await Chat.findOneAndUpdate(
    { _id: chatId },
    {
      $push: {
        messages: messageId,
      },
    }
  ).then((savedChat) => savedChat);
  return savedChat;
}

async function getChats(userid) {
  const chats = await Chat.find({ participants: userid })
    .then((chats) => chats)
    .catch((err) => console.log(err));
  return chats;
}

async function removeChat({ chatid, userid }) {
  const { noParticipants, updated } = await removeUserFromChat({
    chatid,
    userid,
  });

  if (noParticipants) {
    await deleteChat(chatid);
    await removeMessagesByChatId(chatid);
  }

  return updated;
}

async function deleteChat(chatid) {
  const deleted = await Chat.deleteOne({
    _id: chatid,
    participants: { $exists: true, $size: 0 },
  }).then((res) => {
    return res.n !== 0;
  });
  return deleted;
}

async function removeUserFromChat({ userid, chatid }) {
  const response = { updated: false, noParticipants: false };

  response.noParticipants = await Chat.findByIdAndUpdate(
    { _id: chatid },
    {
      $pull: { participants: userid },
    },
    (err, res) => {
      if (!err) return (response.updated = true);
    }
  )
    .then((res) => {
      if (res) return res.participants.length < 1;
    })
    .catch((err) => console.log(err));

  return response;
}

module.exports = {
  createNewChat,
  getChats,
  removeChat,
  addMessageToChat,
};

import React, { useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";

const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState();
  const [selectedChatId, setSelectedChatId] = useState();
  const [newChat, setNewChat] = useState();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("chats", (chats) => {
        setChats(chats);
      });
      socket.on("newChat", ({ chat }) => {
        chat.new = true;
        setNewChat(chat);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (newChat) {
      if (newChat._id === selectedChatId) newChat.new = false;
      setChats((chats) => [...chats, newChat]);
      setNewChat(null);
    } else {
      chats &&
        setChats((chats) =>
          chats.map((chat) => {
            if (chat._id === selectedChatId) {
              chat.new = false;
            }
            return chat;
          })
        );
    }
  }, [selectedChatId, newChat]);

  const getChatById = (id) => {
    if (!id && typeof id !== "string") return null;
    return chats.find((chat) => chat._id === id);
  };

  const createNewChat = ({ chat, message }, callBack) => {
    if (chat) {
      socket.emit("newChat", { chat, message }, (id) => {
        setSelectedChatId(id);
        callBack();
      });
    }
  };

  const removeChat = (chatId, callBack) => {
    socket.emit("removeChat", chatId, callBack);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        selectedChatId,
        setSelectedChatId,
        getChatById,
        createNewChat,
        removeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChats = () => {
  return useContext(ChatContext);
};

import React, { useContext, useEffect, useState } from "react";
import { useChats } from "./ChatProvider";
import { useSocket } from "./SocketProvider";

const MessageContext = React.createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const { selectedChatId } = useChats();

  useEffect(() => {
    if (selectedChatId === "") return setMessages([]);

    if (socket) {
      socket.on("message", (msg) => {
        if (msg.chatid === selectedChatId) {
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      });
    }

    if (socket && selectedChatId) {
      socket.emit("messages", selectedChatId);
      socket.on("messages", (response) => setMessages(response.messages));
    }
  }, [socket, selectedChatId]);

  const sendMessage = (content, callback) => {
    const message = { content, chatId: selectedChatId };
    socket.emit("message", message, callback);
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessageContext);
};

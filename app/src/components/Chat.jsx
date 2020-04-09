import React, { useState } from "react";
import ChatBox from "./ChatBox.jsx";
import api from "../api/api";
import { useEffect } from "react";
import { getChats } from "../utils/defaultAPIConfig.js";
import io from "socket.io-client";
const Chat = () => {
  const [socket, setSocket] = useState(io("https://localhost:3000"));
  const [closed, setClosed] = useState(false);
  console.log("CHAT");
  return (
    <div
      className={`${
        closed
          ? "chat-close chat d-flex flex-column flex-justify-between"
          : "chat d-flex flex-column flex-justify-between"
      }`}
    >
      <div onClick={() => setClosed(!closed)} className="chat-header">
        Chat
      </div>
      <ChatBox closed={closed} socket={socket} />
    </div>
  );
};

export default Chat;

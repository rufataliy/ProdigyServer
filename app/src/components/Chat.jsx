import React, { useState } from "react";
import ChatBox from "./ChatBox.jsx";
import api from "../api/api";
import { useEffect } from "react";
import { getChats } from "../utils/defaultAPIConfig.js";
import io from "socket.io-client";
const Chat = () => {
  const [socket, setSocket] = useState(io("https://localhost:3000"));
  console.log("CHAT");
  return (
    <div className="chat d-flex flex-column flex-justify-between">
      <ChatBox socket={socket} />
    </div>
  );
};

export default Chat;

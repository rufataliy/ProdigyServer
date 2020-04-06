import React, { useState } from "react";
import ChatBox from "./ChatBox.jsx";
import api from "../api/api";
import { useEffect } from "react";
import { getChats } from "../utils/defaultAPIConfig.js";
const Chat = () => {
  const [chats, setChats] = useState();
  useEffect(() => {
    api(getChats)
      .then((chats) => {
        setChats(chats);
      })
      .catch((err) => console.log(err));
  }, []);
  return <ChatBox setChats={setChats} chats={chats} />;
};

export default Chat;

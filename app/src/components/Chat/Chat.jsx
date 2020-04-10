import React, { useState } from "react";
import ChatBox from "./ChatBox.jsx";
import api from "../../api/api";
import Icon from "../../views/_Icon.jsx";
import { useEffect } from "react";
import { getChats } from "../../utils/defaultAPIConfig.js";
import io from "socket.io-client";
import { Badge, Button } from "react-bootstrap";
const Chat = () => {
  const [socket, setSocket] = useState(io("https://prodigy.rufataliyev.com"));
  const [online, setOnline] = useState(false);
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    socket.on("disconnect", (a) => {
      console.log(a);
      setOnline(false);
    });
    socket.on("reconnecting", (number) => {
      if (number > 10) setOnline(false);
    });
    socket.on("reconnect", (number) => {
      setOnline(true);
    });
    socket.on("connected", (response) => {
      console.log(response);
      setOnline(response.connected);
    });
    socket.on("connect", (response) => {
      setOnline(true);
    });
    window.addEventListener("offline", () => setOnline(false));
    return window.removeEventListener("offline", () => () => setOnline(false));
  }, [online]);
  console.log("CHAT");
  return (
    <div className={`${closed ? "chat-close chat-wrapper" : "chat-wrapper"}`}>
      <div className="chat d-flex flex-column flex-justify-between">
        {!closed ? (
          <div onClick={() => setClosed(!closed)} className="chat-header">
            Chat
            <Badge
              className="ml-1 status"
              variant={online ? "success" : "dark"}
            ></Badge>
          </div>
        ) : (
          <Button
            onClick={() => setClosed(!closed)}
            className="btn-primary rounded-btn"
            variant="outline-primary"
          >
            <Icon className="fas fa-comment-alt" />
          </Button>
        )}
        <ChatBox closed={closed} socket={socket} />
      </div>
    </div>
  );
};

export default Chat;

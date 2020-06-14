import React, { useState } from "react";
import ChatBox from "./ChatBox.jsx";
import Icon from "../../views/_Icon.jsx";
import { useEffect } from "react";
import io from "socket.io-client";
import { Badge, Button } from "react-bootstrap";
import { env } from "process";

const Chat = () => {
  const [socket, setSocket] = useState(io(env.BASE_URL));
  const [online, setOnline] = useState(false);
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    socket.on("disconnect", (a) => {
      setOnline(false);
    });
    socket.on("reconnecting", (number) => {
      if (number > 10) setOnline(false);
    });
    socket.on("reconnect", (number) => {
      setOnline(true);
    });
    socket.on("connected", (response) => {
      setOnline(response.connected);
    });
    socket.on("connect", (response) => {
      setOnline(true);
    });
    window.addEventListener("offline", () => setOnline(false));
    return window.removeEventListener("offline", () => () => setOnline(false));
  }, [online]);
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

export default React.memo(Chat);

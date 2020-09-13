import React, { useState, useContext } from "react";
import ChatBox from "./ChatBox.jsx";
import Icon from "../../views/_Icon.jsx";
import { Badge, Button } from "react-bootstrap";
import { useSocket } from "../../store/SocketProvider.js";
const Chat = () => {
  const [closed, setClosed] = useState(true);
  const { online } = useSocket();
  return (
    <div className={`${closed ? "chat-close chat-wrapper" : "chat-wrapper"}`}>
      <div className="chat d-flex flex-column flex-justify-between">
        {!closed ? (
          <div
            onClick={() => setClosed(!closed)}
            className="chat-header text-center"
          >
            Chat
            <Badge
              className={`ml-1 status ${online ? "online" : "offline"}`}
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
        <ChatBox closed={closed} />
      </div>
    </div>
  );
};

export default Chat;

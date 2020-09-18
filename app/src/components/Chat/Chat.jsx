import React, { useState } from "react";
import ChatBox from "./ChatBox.jsx";
import { useSocket } from "../../store/SocketProvider.js";
import _RoundedBtn from "../../views/_RoundedBtn.jsx";

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
            <span className={`ml-1 status ${online ? "online" : "offline"}`} />
          </div>
        ) : (
          <_RoundedBtn
            iconName="fas fa-comment-alt"
            onClick={() => setClosed(!closed)}
          />
        )}
        <ChatBox closed={closed} />
      </div>
    </div>
  );
};

export default Chat;

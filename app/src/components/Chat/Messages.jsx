import React, { useState, useEffect } from "react";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
import SendMessages from "./sendMessage.jsx";

const Messages = ({
  messages,
  setKey,
  resetChatState,
  authorid,
  chatState,
  socket,
}) => {
  return (
    <React.Fragment>
      <RoundedBtn
        onClick={() => {
          resetChatState(), setKey("chats");
        }}
        position="top"
        iconName="fas fa-chevron-left"
      />
      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">
          {chatState && chatState.title}
        </h6>
        <div className="chat-content">
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.author === authorid
                    ? "message-row author-message"
                    : "message-row"
                }
              >
                <p>{message.content}</p>
              </div>
            ))}
        </div>
        <SendMessages
          chatState={chatState}
          authorid={authorid}
          socket={socket}
        />
      </ChatMain>
    </React.Fragment>
  );
};
export default Messages;

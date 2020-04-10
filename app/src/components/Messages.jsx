import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Icon from "../views/_Icon.jsx";
const Messages = ({
  messages,
  setKey,
  resetChatState,
  authorid,
  chatState,
}) => {
  return (
    <div className="messagesBox">
      <div>
        <Button
          onClick={() => {
            resetChatState(), setKey("chats");
          }}
          className="floating-top rounded-btn"
          variant="outline-primary"
        >
          <Icon className="fas fa-chevron-left" />
        </Button>
      </div>
      <h6 className="text-primary mb-1 mt-1 text-center">
        {chatState && chatState.title}
      </h6>
      {messages &&
        messages.map((message, index) => (
          <p
            className={message.author === authorid ? "text-right" : ""}
            key={index}
          >
            {message.content}
          </p>
        ))}
    </div>
  );
};
export default Messages;

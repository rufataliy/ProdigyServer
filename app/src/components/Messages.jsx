import React, { useState, useEffect } from "react";
const Messages = ({ messages, authorid, chatState }) => {
  return (
    <div className="messagesBox">
      <h4>
        <span className="badge badge-secondary">
          {chatState && chatState.name}
        </span>
      </h4>
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

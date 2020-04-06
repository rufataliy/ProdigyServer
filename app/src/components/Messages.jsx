import React, { useState, useEffect } from "react";
const Messages = (props) => {
  return (
    <div>
      {props.messages &&
        props.messages.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))}
    </div>
  );
};
export default Messages;

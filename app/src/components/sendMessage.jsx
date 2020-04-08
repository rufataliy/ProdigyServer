import React, { useState, useContext } from "react";
import Context from "../store/context";

const sendMessage = ({ socket, chatState, authorid }) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };
  const send = () => {
    const msg = {
      participants: chatState.participants,
      chatId: chatState.chatId,
      content: value,
    };
    socket.emit(`message${authorid}`, msg);
    setValue("");
  };

  return (
    <div>
      <input onChange={onChange} type="text" value={value} />
      <button
        disabled={chatState.state === "initial" ? true : false}
        type="button"
        onClick={send}
      >
        Send
      </button>
    </div>
  );
};
export default sendMessage;

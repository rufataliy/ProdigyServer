import React, { useState, useContext } from "react";
import Context from "../store/context";

const sendMessage = ({ socket, msgBody }) => {
  const {
    appState: { author },
  } = useContext(Context);

  const [value, setValue] = useState("");

  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };
  const send = () => {
    const msg = {
      ...msgBody,
      content: value,
    };
    socket.emit(`message`, msg);
    setValue("");
  };

  return (
    <div>
      <input onChange={onChange} type="text" value={value} />
      <button type="button" onClick={send}>
        Send
      </button>
    </div>
  );
};
export default sendMessage;

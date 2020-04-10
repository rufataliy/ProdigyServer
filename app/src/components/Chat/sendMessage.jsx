import React, { useState, useContext } from "react";
import Context from "../../store/context";
import Icon from "../../views/_Icon.jsx";
import { Button, FormControl, InputGroup } from "react-bootstrap";
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
      title: chatState.title,
      content: value,
    };
    console.log(msg);
    socket.emit(`message${authorid}`, msg);
    setValue("");
  };

  return (
    <div>
      <InputGroup>
        <FormControl onChange={onChange} type="text" value={value} />
        <InputGroup.Append>
          <Button
            className="rounded-btn"
            variant="outline-primary"
            disabled={chatState.state === "initial" ? true : false}
            type="button"
            onClick={send}
          >
            <Icon className="fas fa-paper-plane" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};
export default sendMessage;

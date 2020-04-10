import React, { useState, useContext } from "react";
import Context from "../store/context";
import Icon from "../views/_Icon.jsx";
import { Button, FormControl, InputGroup } from "react-bootstrap";

const ChatTitle = ({ setChatState, setKey }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    const { value } = event.target;
    setChatState((prevState) => ({ ...prevState, title: value }));
    setValue(value);
  };

  return (
    <div>
      <Button
        onClick={() => setKey("people")}
        className="floating-top rounded-btn"
        variant="outline-primary"
      >
        <Icon className="fas fa-chevron-left" />
      </Button>
      <h6 className="text-primary mb-1 mt-1 text-center">Chat title</h6>
      <InputGroup className="mt-4">
        <FormControl onChange={onChange} type="text" value={value} />
        <InputGroup.Append>
          <Button
            className="rounded-btn"
            variant="outline-primary"
            type="button"
            onClick={() => setKey("messages")}
          >
            <Icon className="fas fa-chevron-right" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};
export default ChatTitle;

import React, { useState, useRef, useEffect } from "react";
import Icon from "../../views/_Icon.jsx";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import { useMessages } from "../../store/MessageProvider.js";
import { useFocus } from "../../customHooks";

const sendMessage = () => {
  const [value, setValue] = useState("");
  const { sendMessage } = useMessages();
  const inputRef = useRef(null);

  useFocus(inputRef);

  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(value, () => setValue(""));
        }}
      >
        <InputGroup>
          <FormControl
            ref={inputRef}
            placeholder="Enter your message . . "
            onChange={onChange}
            type="text"
            value={value}
          />
          <InputGroup.Append>
            <Button
              className="rounded-btn"
              variant="outline-primary"
              disabled={value.trim() === ""}
              type="submit"
            >
              <Icon className="fas fa-paper-plane" />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </div>
  );
};
export default sendMessage;

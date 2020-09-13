import React, { useState, useRef } from "react";
import { useChats } from "../../store/ChatProvider.js";
import { useFocus } from "../../customHooks";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import { Button, InputGroup, Form } from "react-bootstrap";

const NewChat = ({ authorid, selectedContact, setKey }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { createNewChat } = useChats();

  const onTitleChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };
  const onMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const createChat = (e) => {
    e.preventDefault();
    const chat = { title, participants: [authorid, selectedContact] };
    const newMessage = { content: message, chatId: undefined };
    createNewChat({ chat, message: newMessage }, () => setKey("messages"));
  };

  const inputRef = useRef(null);
  useFocus(inputRef);

  return (
    <div>
      <RoundedBtn
        onClick={() => setKey("people")}
        position="top-left"
        iconName="fas fa-chevron-left"
      />
      <h6 className="text-primary mb-1 mt-1 text-center">Chat title</h6>
      <div className="pt-5">
        <Form onSubmit={createChat}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              ref={inputRef}
              onChange={onTitleChange}
              type="text"
              value={title}
              autoComplete="true"
              placeholder="Enter title"
            />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              required
              onChange={onMessageChange}
              as="textarea"
              rows="4"
              placeholder="Enter your message"
            />
          </Form.Group>
          <Button variant="outline-primary" block type="submit">
            Chat
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default NewChat;

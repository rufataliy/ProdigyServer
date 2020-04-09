import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import Icon from "../views/_Icon.jsx";
const ChatList = ({ chats, openChat, setKey, addParticipant }) => {
  return (
    <div>
      <Button
        onClick={() => setKey("people")}
        className="floating-top rounded-btn"
        variant="outline-primary"
      >
        <Icon className="fas fa-plus" />
      </Button>
      <ListGroup className="messagesBox" as="ul">
        {chats != undefined
          ? chats.map((chat, index) => (
              <ListGroup.Item
                as="li"
                key={index}
                id={chat._id}
                onClick={() => {
                  chat.new = false;
                  return openChat(chat._id);
                }}
                variant={chat.new ? "success" : ""}
              >
                {chat.title}
              </ListGroup.Item>
            ))
          : "loading"}
      </ListGroup>
    </div>
  );
};

export default ChatList;

import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
const ChatList = ({ chats, openChat, addParticipant }) => {
  return (
    <div>
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
                {chat._id}
                {/* <button key={index} id={chat._id} onClick={addParticipant}>
                  add
                </button> */}
              </ListGroup.Item>
            ))
          : "loading"}
      </ListGroup>
    </div>
  );
};

export default ChatList;

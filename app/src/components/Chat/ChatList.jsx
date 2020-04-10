import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
const ChatList = ({ chats, openChat, setKey, addParticipant }) => {
  return (
    <React.Fragment>
      <RoundedBtn
        onClick={() => setKey("people")}
        position="top"
        iconName="fas fa-plus"
      />
      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">Chat list</h6>
        <ListGroup className="chat-content flex-grow-1" as="ul">
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
      </ChatMain>
    </React.Fragment>
  );
};

export default ChatList;

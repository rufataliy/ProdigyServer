import React, { useState } from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
import api from "../../api/api.js";
import { removeChatOptions, getChats } from "../../utils/defaultAPIConfig";
const ChatList = ({
  chats,
  openChat,
  fetching,
  setChats,
  setKey,
  addParticipant,
}) => {
  const removeChat = (chatId) => {
    api({
      ...removeChatOptions,
      endpoint: removeChatOptions.endpoint + chatId,
    })
      .then(() => {
        api(getChats)
          .then((chats) => {
            setChats(chats);
          })
          .catch((err) => console.log(err));
      })
      .catch(console.log);
  };
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
                <React.Fragment>
                  <ListGroup.Item
                    as="li"
                    key={index}
                    id={chat._id}
                    className="d-flex justify-content-between"
                    // onClick={() => {
                    //   chat.new = false;
                    //   chat.newCount = undefined;
                    //   return openChat(chat._id);
                    // }}
                    variant={chat.new ? "success" : ""}
                  >
                    <p
                      onClick={() => {
                        chat.new = false;
                        chat.newCount = undefined;
                        return openChat(chat._id);
                      }}
                    >
                      {chat.title}
                    </p>
                    <Badge variant="info">
                      {chat.newCount && chat.newCount}
                    </Badge>
                    <Badge
                      variant="primary"
                      onClick={() => removeChat(chat._id)}
                    >
                      delete
                    </Badge>
                  </ListGroup.Item>
                </React.Fragment>
              ))
            : "loading"}
        </ListGroup>
      </ChatMain>
    </React.Fragment>
  );
};

export default ChatList;

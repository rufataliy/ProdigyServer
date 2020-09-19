import React from "react";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
import { useChats } from "../../store/ChatProvider.js";
import { CListGroup, CListGroupItem } from "@coreui/react";

const ChatList = ({ setKey, setClosed }) => {
  const { chats, setSelectedChatId } = useChats();

  const openChat = (chatid) => {
    setSelectedChatId(chatid);
    setKey("messages");
  };

  return (
    <React.Fragment>
      <RoundedBtn
        onClick={() => setKey("people")}
        position="top-left"
        iconName="fas fa-plus"
      />
      <RoundedBtn
        onClick={() => setClosed(true)}
        position="top-right"
        iconName="fas fa-times"
      />
      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">Chat list</h6>
        <CListGroup className="chat-content flex-grow-1" as="ul">
          {chats != undefined
            ? chats.map((chat, index) => (
                <CListGroupItem
                  as="li"
                  key={index}
                  id={chat?._id}
                  className="d-flex justify-content-between cursor-pointer chat-list-item"
                  onClick={() => {
                    return openChat(chat._id);
                  }}
                  variant={chat.new ? "success" : ""}
                >
                  <p>{chat.title}</p>
                </CListGroupItem>
              ))
            : "loading"}
        </CListGroup>
      </ChatMain>
    </React.Fragment>
  );
};

export default ChatList;

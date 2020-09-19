import React, { useState } from "react";
import { CTabs, CTabContent, CTabPane } from "@coreui/react";
import Messages from "./Messages.jsx";
import People from "./People.jsx";
import ChatList from "./ChatList.jsx";
import NewChat from "./NewChat.jsx";

import { useChats } from "../../store/ChatProvider.js";
import { useMessages } from "../../store/MessageProvider.js";

const ChatBox = ({ closed, setClosed }) => {
  const [key, setKey] = useState("chats");
  const { chats } = useChats();
  const { messages } = useMessages();
  const [selectedContact, setSelectedContact] = useState();

  return (
    <React.Fragment>
      {closed === false && (
        <CTabs activeTab={key}>
          <CTabContent fade={false}>
            <CTabPane data-tab="people">
              {key === "people" && (
                <People
                  setSelectedContact={setSelectedContact}
                  setClosed={setClosed}
                  setKey={setKey}
                />
              )}
            </CTabPane>
            <CTabPane data-tab="chats">
              {key === "chats" && (
                <ChatList setClosed={setClosed} setKey={setKey} chats={chats} />
              )}
            </CTabPane>
            <CTabPane data-tab="messages">
              {key === "messages" && (
                <Messages setKey={setKey} messages={messages} />
              )}
            </CTabPane>
            <CTabPane data-tab="newChat">
              {key === "newChat" && (
                <NewChat
                  setClosed={setClosed}
                  selectedContact={selectedContact}
                  setKey={setKey}
                />
              )}
            </CTabPane>
          </CTabContent>
        </CTabs>
      )}
    </React.Fragment>
  );
};

export default ChatBox;

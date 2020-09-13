import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";

import Messages from "./Messages.jsx";
import Context from "../../store/context";
import People from "./People.jsx";
import ChatList from "./ChatList.jsx";
import NewChat from "./NewChat.jsx";

import { useSocket } from "../../store/SocketProvider.js";
import { useChats } from "../../store/ChatProvider.js";
import { useMessages } from "../../store/MessageProvider.js";

const ChatBox = ({ closed }) => {
  const defaultChatState = { state: "intital" };
  const { author } = useContext(Context);
  const [key, setKey] = useState("chats");
  const { chats } = useChats();
  const { messages } = useMessages();
  const [selectedContact, setSelectedContact] = useState();
  const socket = useSocket();

  const handleSelect = (k) => {
    setKey(k);
  };

  return (
    <React.Fragment>
      {closed === false && (
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => handleSelect(k)}
        >
          <Tab eventKey="people">
            {key == "people" && (
              <People setSelectedContact={setSelectedContact} setKey={setKey} />
            )}
          </Tab>
          <Tab className="pr-2 pl-2" eventKey="newChat">
            {key == "newChat" && (
              <NewChat
                selectedContact={selectedContact}
                setKey={setKey}
                authorid={author._id}
              />
            )}
          </Tab>
          <Tab eventKey="chats">
            {key == "chats" && chats && (
              <ChatList setKey={setKey} chats={chats} />
            )}
          </Tab>
          <Tab className="pr-2 pl-2 pb-2" eventKey="messages">
            {key == "messages" && messages && (
              <Messages
                setKey={setKey}
                authorid={author._id}
                messages={messages}
              />
            )}
          </Tab>
        </Tabs>
      )}
    </React.Fragment>
  );
};

export default ChatBox;

import React, { useState, useEffect, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import io from "socket.io-client";
import Messages from "./Messages.jsx";
import SendMessages from "./sendMessage.jsx";
import Context from "../store/context";
import People from "./People.jsx";
import ChatList from "./ChatList.jsx";
import Modal from "./Modal.jsx";
import { FormikForm } from "./form.jsx";

const ChatBox = ({ chats, setChats }) => {
  const { compUpdate, actions } = useContext(Context);
  const [state, setState] = useState();
  const [inputValue, setInputValue] = useState("");
  const [key, setKey] = useState("people");
  const socket = io("https://localhost:3000");
  const [messages, setMessages] = useState();
  const [msgBody, setMsgBody] = useState("");
  const {
    appState: { author },
  } = useContext(Context);
  useEffect(() => {
    socket.on("chat", (a) => {
      setState(() => a.chats);
    });
  }, [compUpdate]);
  socket.on(`message${author.sub}`, (a) => {
    chats[0].messages.push(a);
    setChats(() => chats);
    actions({
      type: "setComponentUpdate",
      payload: !compUpdate,
    });
  });

  const openChat = (event) => {
    const { id } = event.target;
    chats.map((chat) => {
      if (chat._id === id) {
        setMessages([...chat.messages]);
        setMsgBody({ chatId: id, participants: chat.participants });
      }
    });
    setKey("messages");
  };
  const newChat = (userId) => {
    setMsgBody({ participants: userId });
    setKey("messages");
  };
  const addParticipant = () => {
    const { id } = event.target;
    const newChats = chats.map((chat) => {
      if (chat._id === id) {
        chat.participants = [...chat.participants, "Rufo"];
        return chat;
      }
    });
    setChats(newChats);
  };
  return (
    <div>
      <Modal>
        <FormikForm />
      </Modal>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="people" title="People">
          <People newChat={newChat} />
        </Tab>
        <Tab eventKey="chats" title="Chats">
          <ChatList
            chats={chats}
            addParticipant={addParticipant}
            openChat={openChat}
          />
        </Tab>
        <Tab eventKey="messages" title="Messages">
          <Messages messages={messages} />
          <SendMessages msgBody={msgBody} chatId={chats} socket={socket} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ChatBox;

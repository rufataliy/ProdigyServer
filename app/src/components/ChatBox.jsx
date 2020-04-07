import React, { useState, useEffect, useContext, useMemo } from "react";
import { Tabs, Tab } from "react-bootstrap";
import io from "socket.io-client";
import Messages from "./Messages.jsx";
import SendMessages from "./sendMessage.jsx";
import Context from "../store/context";
import People from "./People.jsx";
import ChatList from "./ChatList.jsx";
import Modal from "./Modal.jsx";
import { FormikForm } from "./form.jsx";
import { getChats } from "../utils/defaultAPIConfig.js";
import api from "../api/api";

const ChatBox = ({ socket }) => {
  const { compUpdate, actions, appState } = useContext(Context);
  const [key, setKey] = useState("people");
  const [messages, setMessages] = useState();
  const [msgBody, setMsgBody] = useState("");
  const [chats, setChats] = useState();
  const [newMessage, setNewMessage] = useState();
  console.log("chat rerendered");
  useEffect(() => {
    socket = io("https://localhost:3000", { forceNew: true });
    api(getChats)
      .then((chats) => {
        setChats(chats);
      })
      .catch((err) => console.log(err));
    socket.on(`message${appState.author.sub}`, (newMessage) => {
      console.log(newMessage);
      setNewMessage((prevState) => ({ ...newMessage }));
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const updateMessages = useMemo(() => (newMessage) => {
    setChats((prevState) => {
      console.log(prevState);
      return prevState.map((chat, index) => {
        if (chat._id === newMessage.chatId) {
          chat.messages.push(newMessage);
          setMessages(chat.messages);
          // setNewMessage({});
          return chat;
        } else {
          return chat;
        }
      });
    });
  });
  // useEffect(() => {
  //   console.log("on message");

  //   socket.on(`message`, (newMessage) => {
  //     console.log(newMessage);
  //     updateMessages(newMessage);
  //     // setNewMessage((prevState) => ({ ...newMessage }));
  //   });
  // }, []);
  useEffect(() => {
    chats &&
      chats.map((chat, index) => {
        if (chat._id === newMessage.chatId) {
          chat.messages.push(newMessage);
          setMessages(chat.messages);
          setNewMessage({});
        }
      });
  }, [newMessage]);

  const openChat = (event) => {
    const { id } = event.target;
    chats.map((chat, index) => {
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
          {key == "people" && <People newChat={newChat} />}
        </Tab>
        <Tab eventKey="chats" title="Chats">
          {key == "chats" && (
            <ChatList
              chats={chats}
              addParticipant={addParticipant}
              openChat={openChat}
            />
          )}
        </Tab>
        <Tab eventKey="messages" title="Messages">
          {key == "messages" && (
            <div>
              <Messages messages={messages} />
              <SendMessages msgBody={msgBody} socket={socket} />
            </div>
          )}
        </Tab>
      </Tabs>
      {JSON.stringify(newMessage && newMessage.content)}
    </div>
  );
};

export default React.memo(ChatBox);

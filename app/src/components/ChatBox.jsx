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
  const { author } = useContext(Context);
  const [key, setKey] = useState("people");
  const [messages, setMessages] = useState();
  const [chatState, setChatState] = useState({ state: "initial" });
  const [chats, setChats] = useState();
  const [newMessage, setNewMessage] = useState();
  const [response, setReponse] = useState({});
  let update;
  useEffect(() => {
    api(getChats)
      .then((chats) => {
        setChats(chats);
      })
      .catch((err) => console.log(err));
    socket.on("connected", (a) => console.log(a));
    socket.on(`message${author.sub}`, (response) => setReponse(() => response));
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    console.log("socket effect");
    console.log(chatState);
    console.log(response);
    if (response.chat) {
      if (chatState.state === "new") {
        setChatState({ ...chatState, chatId: response.chat._id });
      }
      setChats((prevState) => [response.chat, ...prevState]);
      // setNewMessage((prevState) => ({ ...response.message }));
      // if (!chatState.participants && !chatState.chatId) {
      //   console.log("new chat");
      //   setChatState((prevState) => ({
      //     ...prevState,
      //     chatId: response.chat._id,
      //   }));
      // }
      setNewMessage((prevState) => ({ ...response.message }));
    } else {
      setNewMessage((prevState) => ({ ...response.message }));
    }
  }, [author, response]);
  useEffect(() => {
    console.log("set new messages");
    chats &&
      setChats(() =>
        chats.map((chat, index) => {
          if (chat._id === newMessage.chatId) {
            chat.messages.push(newMessage);
            if (
              chatState.state === "existing" &&
              chatState.chatId === newMessage.chatId
              // || (!msgBody.chatId && msgBody.participants)
            ) {
              setMessages(chat.messages);
            } else {
              chat.new = true;
            }
            setNewMessage({});
            return chat;
          } else {
            return chat;
          }
        })
      );
  }, [newMessage]);

  const openChat = (id) => {
    chats.map((chat, index) => {
      if (chat._id === id) {
        setMessages([...chat.messages]);
        setChatState(() => ({
          chatId: id,
          participants: chat.participants,
          state: "existing",
        }));
      }
    });
    setKey("messages");
  };
  const newChat = (userId, name) => {
    setMessages([]);
    setChatState(() => ({
      participants: [userId, author.sub],
      name,
      chatId: null,
      state: "new",
    }));
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
  const handleSelect = (k) => {
    setChatState(() => ({ state: "initial" }));
    setMessages([]);
    setKey(k);
  };
  return (
    <div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => handleSelect(k)}
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
            <div className="d-flex flex-column  justify-content-between">
              <Messages
                authorid={author.sub}
                chatState={chatState}
                messages={messages}
              />
              <SendMessages
                chatState={chatState}
                authorid={author.sub}
                socket={socket}
              />
            </div>
          )}
        </Tab>
      </Tabs>
      {JSON.stringify(newMessage && newMessage.content)}
    </div>
  );
};

export default React.memo(ChatBox);

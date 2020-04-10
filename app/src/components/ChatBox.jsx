import React, { useState, useEffect, useContext, useMemo } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
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
import ChatTitle from "./ChatTitle.jsx";
const ChatBox = ({ socket, closed }) => {
  const defaultChatState = { state: "intital" };
  const { author } = useContext(Context);
  const [key, setKey] = useState("chats");
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
      if (
        chatState.state === "new" &&
        chatState.title === response.chat.title
      ) {
        setChatState({ ...chatState, chatId: response.chat._id });
      }
      setChats((prevState) => [response.chat, ...prevState]);

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
          title: chat.title,
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
    setKey("newChat");
  };
  const resetChatState = () => {
    setChatState(() => defaultChatState);
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
    <React.Fragment>
      {closed === false && (
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => handleSelect(k)}
        >
          <Tab eventKey="people">
            {key == "people" && (
              <People
                resetChatState={resetChatState}
                setKey={setKey}
                newChat={newChat}
              />
            )}
          </Tab>
          <Tab className="pr-2 pl-2" eventKey="newChat">
            {key == "newChat" && (
              <ChatTitle setChatState={setChatState} setKey={setKey} />
            )}
          </Tab>
          <Tab eventKey="chats">
            {key == "chats" && (
              <ChatList
                resetChatState={resetChatState}
                setKey={setKey}
                chats={chats}
                setChatState={setChatState}
                addParticipant={addParticipant}
                openChat={openChat}
              />
            )}
          </Tab>
          <Tab className="pr-2 pl-2 pb-2" eventKey="messages">
            {key == "messages" && (
              <div className="d-flex h-100 flex-column justify-content-between">
                <Messages
                  setKey={setKey}
                  resetChatState={resetChatState}
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
      )}
    </React.Fragment>
  );
};

export default React.memo(ChatBox);

import React, { useState, useEffect, useContext, useMemo } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";

import Messages from "./Messages.jsx";
import Context from "../../store/context";
import People from "./People.jsx";
import ChatList from "./ChatList.jsx";
import ChatTitle from "./ChatTitle.jsx";
import { getChats } from "../../utils/defaultAPIConfig.js";
import api from "../../api/api";

const ChatBox = ({ socket, closed }) => {
  const defaultChatState = { state: "intital" };
  const { author } = useContext(Context);
  const [key, setKey] = useState("chats");
  const [messages, setMessages] = useState();
  const [chatState, setChatState] = useState(defaultChatState);
  const [chats, setChats] = useState();
  const [newMessage, setNewMessage] = useState();
  const [response, setReponse] = useState({});
  const [fetching, setFetching] = useState(false);
  //gets chats and sets incoming message listener
  useEffect(() => {
    setFetching(true);
    api(getChats)
      .then((chats) => {
        setChats(chats);
        setFetching(false);
      })
      .catch((err) => console.log(err));

    socket.on(`message${author._id}`, (response) => setReponse(() => response));
    return () => {
      socket.disconnect();
    };
  }, []);
  //checks if new chat imcoming chat is the current open chat updates chatState
  //else updates newMessage
  useEffect(() => {
    if (response.chat) {
      if (
        chatState.state === "new" &&
        chatState.title === response.chat.title
      ) {
        setChatState({ ...chatState, chatId: response.chat._id });
      }
      setChats((prevState) => [response.chat, ...prevState]);
    }
    setNewMessage((prevState) => ({ ...response.message }));
  }, [author, response]);
  //adds incoming message to the chat
  //if opened chat is the chat of incoming message updates the messages
  //else sets the new property of chat to true
  useEffect(() => {
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
              chat.newCount = chat.newCount ? chat.newCount + 1 : 1;
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
      participants: [userId, author._id],
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
                fetching={fetching}
                setChats={setChats}
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
              <Messages
                socket={socket}
                setKey={setKey}
                resetChatState={resetChatState}
                authorid={author._id}
                chatState={chatState}
                messages={messages}
              />
            )}
          </Tab>
        </Tabs>
      )}
    </React.Fragment>
  );
};

export default React.memo(ChatBox);

import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import Icon from "../../views/_Icon.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
import api from "../../api/api.js";
import { removeChatOptions, getChats } from "../../utils/defaultAPIConfig";
import { useChats } from "../../store/ChatProvider.js";

const ChatList = ({ setKey }) => {
  const { chats, setSelectedChatId } = useChats();
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
      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">Chat list</h6>
        <ListGroup className="chat-content flex-grow-1" as="ul">
          {chats != undefined
            ? chats.map((chat, index) => (
                <ListGroup.Item
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
                </ListGroup.Item>
              ))
            : "loading"}
        </ListGroup>
      </ChatMain>
    </React.Fragment>
  );
};

export default ChatList;

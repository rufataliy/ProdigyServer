import React, { useEffect, useRef } from "react";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
import SendMessages from "./sendMessage.jsx";
import { useMessages } from "../../store/MessageProvider.js";
import { useChats } from "../../store/ChatProvider.js";
import Dropdown from "react-bootstrap/Dropdown";

let prevIsAuthor = false;
let nextIsAuthor = false;

const RoundedBtnToggle = React.forwardRef(
  ({ position, onClick, iconName }, ref) => {
    return (
      <RoundedBtn
        onClick={(e) => onClick(e)}
        ref={ref}
        position={position}
        iconName={iconName}
      />
    );
  }
);

const Messages = ({ setKey, authorid }) => {
  const ref = useRef();
  const { messages } = useMessages();
  const { setSelectedChatId, removeChat, selectedChatId } = useChats();

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  });
  return (
    <React.Fragment>
      <RoundedBtn
        onClick={() => {
          setSelectedChatId("");
          setKey("chats");
        }}
        position="top-left"
        iconName="fas fa-chevron-left"
      />
      <div className="floating-top-right">
        <Dropdown>
          <Dropdown.Toggle
            as={RoundedBtnToggle}
            iconName="fas fa-ellipsis-h"
            id="dropdown-basic"
          />

          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              onClick={() => removeChat(selectedChatId, () => setKey("chats"))}
            >
              Remove
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Add participant</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Details</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">
          {false && chatState.title}
        </h6>
        <div ref={ref} className="chat-content pt-3">
          {messages &&
            messages.map((message, index) => (
              <React.Fragment key={index}>
                {
                  (prevIsAuthor =
                    messages[index - 1]?.author?._id === message.author?._id)
                }
                {
                  (nextIsAuthor =
                    messages[index + 1]?.author?._id === message.author?._id)
                }

                <div
                  className={
                    message.author?._id === authorid
                      ? "message-row author-message"
                      : "message-row"
                  }
                >
                  <div className="message-content">
                    {!prevIsAuthor && (
                      <p className="author-name">{message.author?.name}</p>
                    )}
                    <p
                      className={`message-text ${
                        prevIsAuthor && "middle-message"
                      } ${!nextIsAuthor && prevIsAuthor && "last-message"}`}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
        <SendMessages authorid={authorid} />
      </ChatMain>
    </React.Fragment>
  );
};
export default Messages;

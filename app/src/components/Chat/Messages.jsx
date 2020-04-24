import React, { useEffect, useRef } from "react";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
import SendMessages from "./sendMessage.jsx";

const Messages = ({
  messages,
  setKey,
  resetChatState,
  authorid,
  chatState,
  socket,
}) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  });
  return (
    <React.Fragment>
      <RoundedBtn
        onClick={() => {
          resetChatState(), setKey("chats");
        }}
        position="top"
        iconName="fas fa-chevron-left"
      />
      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">
          {chatState && chatState.title}
        </h6>
        <div ref={ref} className="chat-content">
          {messages &&
            messages.map((message, index) => (
              <React.Fragment>
                {/* {messages[index - 1] &&
                messages[index - 1]._id === message._id ? (
                  <span className="author-name">{message.author.name}</span>
                ) : (
                  ""
                )} */}
                <div
                  key={index}
                  className={
                    message.author._id === authorid
                      ? "message-row author-message"
                      : "message-row"
                  }
                >
                  <p>{message.content}</p>
                </div>
              </React.Fragment>
            ))}
        </div>
        <SendMessages
          chatState={chatState}
          authorid={authorid}
          socket={socket}
        />
      </ChatMain>
    </React.Fragment>
  );
};
export default Messages;

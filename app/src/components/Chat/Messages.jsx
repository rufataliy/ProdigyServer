import React, { useEffect, useRef } from "react";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import ChatMain from "../../views/_ChatMain.jsx";
import SendMessages from "./sendMessage.jsx";
import { useMessages } from "../../store/MessageProvider.js";
import { useChats } from "../../store/ChatProvider.js";
import { useAppState } from "../../store/useGlobalState.js";
import {
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";
import _Icon from "../../views/_Icon.jsx";

let prevIsAuthor = false;
let nextIsAuthor = false;

const Messages = ({ setKey }) => {
  const ref = useRef();
  const { messages } = useMessages();
  const [appState] = useAppState();
  const authorid = appState.author._id;
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
        <CDropdown>
          <CDropdownToggle className="rounded-btn" id="Cdropdown-options-chat">
            <_Icon className="fas fa-ellipsis-h" />
          </CDropdownToggle>

          <CDropdownMenu>
            <CDropdownItem
              onClick={() => removeChat(selectedChatId, () => setKey("chats"))}
            >
              Remove
            </CDropdownItem>
            <CDropdownItem>Add participant</CDropdownItem>
            <CDropdownItem>Details</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>

      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">
          {false && chatState.title}
        </h6>
        <div ref={ref} className="chat-content p-3">
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
                      <p className="author-name mb-1">
                        {message.author?.nickname}
                      </p>
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
        <SendMessages />
      </ChatMain>
    </React.Fragment>
  );
};
export default Messages;

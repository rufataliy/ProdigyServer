import React, { useState } from "react";
import { useChats } from "../../store/ChatProvider.js";
import { useAppState } from "../../store/useGlobalState.js";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import {
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CTextarea,
  CInput,
} from "@coreui/react";

const NewChat = ({ selectedContact, setKey }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { createNewChat } = useChats();
  const [appState] = useAppState();

  const onTitleChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };
  const onMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value);
  };

  const createChat = (e) => {
    e.preventDefault();
    const chat = {
      title,
      participants: [appState.author._id, selectedContact],
    };
    const newMessage = { content: message, chatId: undefined };
    createNewChat({ chat, message: newMessage }, () => setKey("messages"));
  };

  return (
    <div>
      <RoundedBtn
        onClick={() => setKey("people")}
        position="top-left"
        iconName="fas fa-chevron-left"
      />
      <h6 className="text-primary mb-1 mt-1 text-center">Chat title</h6>
      <div className="p-3">
        <CForm onSubmit={createChat}>
          <CFormGroup>
            <CLabel>Title</CLabel>
            <CInput
              required
              onChange={onTitleChange}
              type="text"
              value={title}
              autoComplete="true"
              placeholder="Enter title"
            />
          </CFormGroup>

          <CFormGroup>
            <CLabel>Message</CLabel>
            <CTextarea
              required
              onChange={onMessageChange}
              value={message}
              rows="4"
              placeholder="Enter your message"
            />
          </CFormGroup>
          <CButton className="outline-primary" block type="submit">
            Chat
          </CButton>
        </CForm>
      </div>
    </div>
  );
};
export default NewChat;

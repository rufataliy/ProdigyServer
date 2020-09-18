import React, { useState, useRef, useEffect } from "react";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import { CForm, CInput, CInputGroup, CInputGroupAppend } from "@coreui/react";
import { useMessages } from "../../store/MessageProvider.js";

const sendMessage = () => {
  const [value, setValue] = useState("");
  const { sendMessage } = useMessages();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const onChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div className="p-3 pb-3">
      <CForm
        onSubmit={(e) => {
          if (value.trim() !== "") {           
            e.preventDefault();
            sendMessage(value, () => setValue(""));
          } 
        }}
      >
        <CInputGroup>
          <CInput
            ref={inputRef}
            placeholder="Enter your message . . ."
            onChange={onChange}
            type="text"
            value={value}
          />
          <CInputGroupAppend>
            <RoundedBtn
              className="rounded-btn"
              iconName="fas fa-paper-plane"
              disabled={value.trim() === ""}
              type="submit"
            />
          </CInputGroupAppend>
        </CInputGroup>
      </CForm>
    </div>
  );
};
export default sendMessage;

import React, { useState } from "react";
const ChatList = ({ chats, openChat, addParticipant }) => {
  return (
    <div>
      <button type="button" onClick={openChat}>
        new
      </button>
      {chats != undefined
        ? chats.map((chat, index) => (
            <p key={index} id={chat._id} onClick={openChat}>
              {chat && chat._id}
              <button key={index} id={chat._id} onClick={addParticipant}>
                add
              </button>
            </p>
          ))
        : "loading"}
    </div>
  );
};

export default ChatList;

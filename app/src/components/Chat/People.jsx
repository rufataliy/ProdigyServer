import React, { useState } from "react";
import api from "../../api/api";
import { useEffect } from "react";
import { getContacts } from "../../utils/defaultAPIConfig.js";
import { ListGroup } from "react-bootstrap";
import ChatMain from "../../views/_ChatMain.jsx";
import RoundedBtn from "../../views/_RoundedBtn.jsx";

const People = ({ setSelectedContact, setKey }) => {
  const [people, setPeople] = useState();
  useEffect(() => {
    api(getContacts)
      .then((contacts) => {
        setPeople(contacts);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <React.Fragment>
      <RoundedBtn
        onClick={() => {
          setKey("chats");
        }}
        position="top-left"
        iconName="fas fa-chevron-left"
      />
      <ChatMain>
        <h6 className="text-primary mb-1 mt-1 text-center">People</h6>
        <ListGroup className="chat-content" as="ul">
          {Array.isArray(people)
            ? people.map((person, index) => (
                <ListGroup.Item
                  className="cursor-pointer"
                  as="li"
                  key={index}
                  onClick={() => {
                    setSelectedContact(person._id);
                    setKey("newChat");
                  }}
                  id={person._id}
                >
                  {person.name}
                </ListGroup.Item>
              ))
            : "loading"}
        </ListGroup>
      </ChatMain>
    </React.Fragment>
  );
};

export default People;

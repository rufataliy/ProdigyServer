import React, { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";
import { getContacts } from "../utils/defaultAPIConfig.js";
import { ListGroup, Button, Badge } from "react-bootstrap";
import Icon from "../views/_Icon.jsx";
const People = ({ newChat, resetChatState, setKey }) => {
  const [people, setPeople] = useState();
  useEffect(() => {
    api(getContacts)
      .then((contacts) => {
        setPeople(contacts);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Button
        onClick={() => {
          resetChatState();
          setKey("chats");
        }}
        className="floating-top rounded-btn"
        variant="outline-primary"
      >
        <Icon className="fas fa-chevron-left" />
      </Button>
      <h6 className="text-primary mb-1 mt-1 text-center">People</h6>
      <ListGroup as="ul">
        {Array.isArray(people)
          ? people.map((person, index) => (
              <ListGroup.Item
                as="li"
                key={index}
                onClick={() => newChat(person._id, person.name)}
                id={person._id}
              >
                {person.name}
              </ListGroup.Item>
            ))
          : "loading"}
      </ListGroup>
    </div>
  );
};

export default People;

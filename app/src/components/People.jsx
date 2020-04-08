import React, { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";
import { getContacts } from "../utils/defaultAPIConfig.js";
import { ListGroup, Button } from "react-bootstrap";
import Icon from "../views/_Icon.jsx";
const People = ({ newChat, setKey }) => {
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
        onClick={() => setKey("chats")}
        className="floating rounded-btn"
        variant="outline-primary"
      >
        <Icon className="fas fa-chevron-left" />
      </Button>
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

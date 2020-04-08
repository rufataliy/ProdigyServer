import React, { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";
import { getContacts } from "../utils/defaultAPIConfig.js";
import { ListGroup } from "react-bootstrap";
const People = ({ newChat }) => {
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

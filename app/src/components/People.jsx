import React, { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";
import { getContacts } from "../utils/defaultAPIConfig.js";
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
      {Array.isArray(people)
        ? people.map((person, index) => (
            <p key={index} onClick={() => newChat(person._id)} id={person._id}>
              {person.name}
            </p>
          ))
        : "loading"}
    </div>
  );
};

export default People;

import React, { useEffect, useState, useContext } from "react";
import { StateHandler } from "./StateHandler.jsx";
import Context from "../store/context";
import api from "../api/api.js";
import { Form } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import {
  getStudentListOptions,
  getStudentOptions,
  assignVocabularyOptions,
  getKlass
} from "../utils/defaultAPIConfig";
const AssignTo = ({ setAction, push, remove, initialStudentList }) => {
  const [klasses, setKlasses] = useState([]);
  const [addedKlasses, setAddedKlasses] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [klassId, setklassId] = useState("");
  const { compUpdate, formConfig } = useContext(Context);
  useEffect(() => {
    setFetching(true);
    api(getKlass).then(klasses => {
      setKlasses(klasses);
      setFetching(false);
    });
  }, [compUpdate]);

  const handleChange = event => {
    setklassId(event.target.value);
  };

  const assign = () => {
    api(formConfig, { klassId })
      .then(({ klass, vocabulary }) => {
        setAddedKlasses(prevState => [...prevState, klass.title]);
        setklassId("");
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <Form.Group>
        <Form.Label>Your klasses</Form.Label>
        <Form.Control onChange={handleChange} as="select" value={klassId}>
          <option>Choose a klass</option>
          {klasses.length > 0 ? (
            klasses.map(klass => (
              <option value={klass._id}>{klass.title}</option>
            ))
          ) : (
            <Spinner animation="border" variant="secondary" />
          )}
        </Form.Control>
      </Form.Group>
      <button onClick={assign} type="button">
        assign
      </button>
      {addedKlasses.map(klass => (
        <p>{klass}</p>
      ))}
    </div>
  );
};

export default StateHandler(AssignTo);

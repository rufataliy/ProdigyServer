import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { StateHandler } from "./StateHandler.jsx";
import { editWordOptions } from "../utils/defaultAPIConfig.js";
import Modal from "./Modal.jsx";
import { FormikForm } from "./form.jsx";
const Word = ({ setAction, word }) => {
  const editWord = () => {
    setAction({
      config: { ...editWordOptions, params: word._id, title: word.title },
      payload: word,
      actionNames: ["setFormConfig", "setInitialState", "toggleModal"]
    });
  };
  return (
    <Accordion>
      <Modal>
        <FormikForm />
      </Modal>
      <Card>
        <Accordion.Toggle as={Button} variant="link" eventKey={word._id}>
          <Card.Header>{`${word.phrase} - ${word.definition}`}</Card.Header>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={word._id}>
          <Card.Body>
            {word.example}
            <a onClick={editWord} href="#">
              edit
            </a>
            <a onClick={editWord} href="#">
              delete
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
export default StateHandler(Word);

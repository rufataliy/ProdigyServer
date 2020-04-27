import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { StateHandler } from "./StateHandler.jsx";
import { editWordOptions } from "../utils/defaultAPIConfig.js";
import Modal from "./Modal.jsx";
import { FormikForm } from "./form.jsx";
const Word = ({ word, editWord }) => {
  console.log("word rendered");

  return (
    <Accordion className="m-2">
      <Card style={{ width: "18rem" }}>
        <Accordion.Toggle as={Card} variant="link" eventKey={word._id}>
          <Card.Header>{`${word.phrase}`}</Card.Header>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={word._id}>
          <Card.Body>
            <p className="text-secondary">Definition</p>
            <p>{word.definition}</p>
            <p className="text-secondary">Example</p>
            <p>{word.example}</p>
            <a onClick={() => editWord(word)} href="#">
              edit
            </a>
            <a onClick={() => editWord(word)} href="#">
              delete
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
export default React.memo(Word);

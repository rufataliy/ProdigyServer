import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { StateHandler } from "../StateHandler.jsx";
import { editWordOptions } from "../../utils/defaultAPIConfig.js";
const Word = ({ item, editItem }) => {
  return (
    <Accordion className="m-2">
      <Card style={{ width: "18rem" }}>
        <Accordion.Toggle as={Card} variant="link" eventKey={item._id}>
          <Card.Header>{`${item.phrase}`}</Card.Header>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={item._id}>
          <Card.Body>
            <p className="text-secondary">Definition</p>
            <p>{item.definition}</p>
            <p className="text-secondary">Example</p>
            <p>{item.example}</p>
            <a onClick={() => editItem(item)} href="#">
              edit
            </a>
            <a onClick={() => editItem(item)} href="#">
              delete
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
export default React.memo(Word);

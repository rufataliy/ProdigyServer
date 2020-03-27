import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";

export default ({ word }) => {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Button} variant="link" eventKey={word._id}>
          <Card.Header>{`${word.phrase} - ${word.definition}`}</Card.Header>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={word._id}>
          <Card.Body>{word.example}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

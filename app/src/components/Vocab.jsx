import React from "react";
import { Card } from "react-bootstrap";

const Vocab = props => {
  const { vocab } = props;
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{vocab.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{vocab.topic}</Card.Subtitle>
        <Card.Text>{vocab.level}</Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Vocab;

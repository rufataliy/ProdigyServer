import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Context from "../store/context";

const Vocab = props => {
  const { vocabId } = useParams();
  const {
    vocabState: { vocabs }
  } = useContext(Context);
  let { vocab } = props;
  if (vocabId) {
    vocabs.map(item => {
      if (item._id === vocabId) {
        vocab = item;
      }
    });
  }
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

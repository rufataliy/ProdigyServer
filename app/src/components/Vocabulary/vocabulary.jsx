import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import Icon from "../../views/_Icon.jsx";

const Vocab = ({ editVocab, vocab }) => {
  const { vocabId } = useParams();

  return (
    <span className="m-2 quick-access-btn">
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{vocab.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {vocab.topic}
          </Card.Subtitle>
          <Card.Text>{vocab.level}</Card.Text>
          <Link to={`words/${vocab._id}`}>See words</Link>
          <Icon onClick={() => editVocab(vocab)} className="ml-3 fas fa-pen" />
          <Icon
            onClick={() => editVocab(vocab)}
            className="ml-3 fas fa-trash"
          />
        </Card.Body>
      </Card>
    </span>
  );
};

export default React.memo(Vocab);

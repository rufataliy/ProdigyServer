import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import Context from "../store/context";
import {
  editVocabulary,
  assignVocabularyOptions
} from "../utils/defaultAPIConfig";
import { StateHandler } from "./StateHandler.jsx";
const Vocab = ({ setAction, vocab }) => {
  const { vocabId } = useParams();
  const { url } = useRouteMatch();
  console.log(url);

  const {
    vocabState: { vocabs }
  } = useContext(Context);
  if (vocabId) {
    vocabs.map(item => {
      if (item._id === vocabId) {
        vocab = item;
      }
    });
  }
  const editVocab = () => {
    setAction({
      config: { ...editVocabulary, params: vocab._id, title: vocab.title },
      payload: vocab,
      actionNames: ["setFormConfig", "setInitialState", "toggleModal"]
    });
  };
  const assignToKlass = () => {
    setAction({
      config: {
        ...assignVocabularyOptions,
        params: vocab._id,
        title: vocab.title
      },
      actionNames: ["setFormConfig", "toggleModal"]
    });
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{vocab.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{vocab.topic}</Card.Subtitle>
        <Card.Text>{vocab.level}</Card.Text>
        <Link to={`${url}words/${vocab._id}`}>See words</Link>
        <a class="ml-3" onClick={editVocab} href="#">
          edit
        </a>
        <a class="ml-3" onClick={editVocab} href="#">
          delete
        </a>
        <a class="ml-3" onClick={assignToKlass} href="#">
          assign to a klass
        </a>
      </Card.Body>
    </Card>
  );
};

export default StateHandler(Vocab);

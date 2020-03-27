import React from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { Accordion, Card, Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import Context from "../store/context";
const Wordlist = () => {
  const { vocabId } = useParams();
  const { vocabState, compUpdate, actions } = useContext(Context);
  useEffect(() => {
    const config = {
      collectionName: "words",
      method: "get",
      docId: vocabId
    };
    api(config)
      .then(words => {
        console.log(words);

        actions({
          type: "setVocabState",
          payload: {
            ...vocabState,
            allWords: words
          }
        });
      })
      .catch(err => console.log(err));
  }, [compUpdate]);
  return (
    <div>
      {vocabState.allWords.map(word => (
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
      ))}
    </div>
  );
};
export default Wordlist;

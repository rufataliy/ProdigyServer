import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Vocabulary from "./Vocabulary.jsx";
import Context from "../store/context";
import api from "../api/api.js";
import { VOCAB } from "../store/useGlobalState";
import { StateHandler } from "./StateHandler.jsx";
import Modal from "./Modal.jsx";
import { FormikForm } from "./form.jsx";
import { newVocabulary } from "../utils/defaultInitialValues.js";
import { getVocabulary, createVocabulary } from "../utils/defaultAPIConfig";
import { Spinner } from "react-bootstrap";
const VocabularyList = props => {
  const { actions, vocabState, compUpdate } = useContext(Context);
  const [fetching, setFetching] = useState(false);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];

  useEffect(() => {
    setFetching(true);
    api(getVocabulary)
      .then(vocabs => {
        setFetching(false);
        actions({
          type: VOCAB,
          payload: {
            ...vocabState,
            vocabs
          }
        });
      })
      .catch(err => console.log(err));
  }, [compUpdate]);

  const createVocab = () => {
    props.setAction({
      config: createVocabulary,
      payload: newVocabulary,
      actionNames
    });
  };
  return (
    <div>
      <button onClick={createVocab}>add vocabulary</button>
      <Modal>
        <FormikForm />
      </Modal>
      {!fetching && vocabState.vocabs ? (
        vocabState.vocabs.map(vocab => (
          <Vocabulary key={vocab._id} vocab={vocab} />
        ))
      ) : (
        <Spinner animation="border" variant="secondary" />
      )}
    </div>
  );
};
export default StateHandler(VocabularyList);

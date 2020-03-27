import React, { useContext, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Vocab from "./Vocab.jsx";
import Context from "../store/context";
import api from "../api/api.js";
import { VOCAB } from "../store/useGlobalState";
import { StateHandler } from "./StateHandler.jsx";
import BootModal from "./bootModal.jsx";
import { FormikForm } from "./form.jsx";
import { newVocabulary } from "../utils/defaultInitialValues.js";
import { getVocabulary, createVocabulary } from "../utils/defaultAPIConfig";
const VocabularyList = props => {
  const { actions, vocabState, compUpdate } = useContext(Context);
  const { url } = useRouteMatch();
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];

  useEffect(() => {
    api(getVocabulary)
      .then(vocabs => {
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
      <BootModal>
        <FormikForm />
      </BootModal>
      {vocabState.vocabs.map(vocab => (
        <Link to={`${url}/${vocab._id}`}>
          <Vocab vocab={vocab} />
        </Link>
      ))}
    </div>
  );
};
export default StateHandler(VocabularyList);

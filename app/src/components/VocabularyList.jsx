import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Vocabulary from "./Vocabulary.jsx";
import Context from "../store/context";
import api from "../api/api.js";
import { VOCAB } from "../store/useGlobalState";
import { StateHandler } from "./StateHandler.jsx";
import Modal from "./Modal.jsx";
import { FormikForm } from "./form.jsx";
import { newVocabulary } from "../utils/defaultInitialValues.js";
import {
  getVocabulary,
  createVocabulary,
  editVocabulary,
} from "../utils/defaultAPIConfig";
import Loading from "../views/_Loading.jsx";
import RoundedBtn from "../views/_RoundedBtn.jsx";
const VocabularyList = ({ setAction }) => {
  const { actions, vocabState, compUpdate } = useContext(Context);
  const [fetching, setFetching] = useState(false);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];

  useEffect(() => {
    setFetching(true);
    api(getVocabulary)
      .then((vocabs) => {
        actions({
          type: VOCAB,
          payload: {
            ...vocabState,
            vocabs,
          },
        });
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err);
      });
  }, [compUpdate]);

  const createVocab = () => {
    setAction({
      config: createVocabulary,
      payload: newVocabulary,
      actionNames,
    });
  };
  const editVocab = useCallback(
    (vocab) =>
      setAction({
        config: { ...editVocabulary, params: vocab._id, title: vocab.title },
        payload: vocab,
        actionNames: ["setFormConfig", "setInitialState", "toggleModal"],
      }),
    []
  );
  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">Vocabularies </h3>
        <RoundedBtn onClick={createVocab} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && vocabState.vocabs ? (
          vocabState.vocabs.map((vocab) => (
            <Vocabulary editVocab={editVocab} key={vocab._id} vocab={vocab} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(VocabularyList));

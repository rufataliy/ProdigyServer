import React, { useContext, useEffect } from "react";
import Vocab from "./Vocab.jsx";
import Context from "../store/context";
import api from "../api/api.js";
import { VOCAB } from "../store/useGlobalState";
import { StateHandler } from "./StateHandler.jsx";
import BootModal from "./bootModal.jsx";
import { FormikForm } from "./form.jsx";

const VocabularyHome = props => {
  const {
    actions,
    vocabState,
    initialValues,
    formConfig,
    compUpdate
  } = useContext(Context);
  console.log(props);

  const actionConfig = {
    config: {
      ...formConfig,
      collectionName: "vocabularies",
      formType: "newVocabulary",
      method: "post"
    },
    initialValues: {
      ...initialValues,
      newVocabulary: {
        name: "",
        topic: "",
        level: ""
      }
    },
    actionNames: ["setFormConfig", "setInitialState", "toggleModal"]
  };

  // setAction(actionConfig);
  useEffect(() => {
    const config = {
      collectionName: "vocabularies",
      method: "get"
    };
    api(config)
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
    props.setAction(actionConfig);
  };
  return (
    <div>
      <button onClick={createVocab}>add vocabulary</button>
      <BootModal>
        <FormikForm />
      </BootModal>
      {vocabState.vocabs.map(vocab => (
        <Vocab vocab={vocab} />
      ))}
    </div>
  );
};
export default StateHandler(VocabularyHome);

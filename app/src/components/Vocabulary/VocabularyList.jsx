import React, { useContext, useEffect, useState, useCallback } from "react";
import Context from "../../store/context";
import api from "../../api/api.js";
import { VOCAB } from "../../store/useGlobalState";
import { StateHandler } from "../StateHandler.jsx";

import { newVocabulary } from "../../utils/defaultInitialValues.js";
import {
  getVocabularyOptions,
  createVocabularyOptions,
  editVocabularyOptions,
} from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import ListItem from "../../views/_ListItem.jsx";
const VocabularyList = ({ setAction }) => {
  const { actions, vocabState, compUpdate } = useContext(Context);
  const [fetching, setFetching] = useState(false);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];

  useEffect(() => {
    setFetching(true);
    api(getVocabularyOptions)
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

  const createVocabulary = () => {
    setAction({
      config: createVocabularyOptions,
      payload: newVocabulary,
      actionNames,
    });
  };
  const editVocabulary = useCallback(
    (vocab) =>
      setAction({
        config: {
          ...editVocabularyOptions,
          params: vocab._id,
          title: vocab.title,
        },
        payload: vocab,
        actionNames: ["setFormConfig", "setInitialState", "toggleModal"],
      }),
    []
  );
  return (
    <List
      Component={ListItem}
      fetching={fetching}
      editItem={editVocabulary}
      items={vocabState.vocabs}
      createItem={createVocabulary}
      listName="Vocabularies"
    />
  );
};
export default React.memo(StateHandler(VocabularyList));

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useContext, useEffect, useCallback } from "react";
import Context from "../../store/context";
import {
  getWordsOptions,
  createWordOptions,
  editWordOptions,
} from "../../utils/defaultAPIConfig";
import { newWord } from "../../utils/defaultInitialValues";
import { StateHandler } from "../StateHandler.jsx";
import List from "../../views/_List.jsx";
import Word from "./Word.jsx";
const Wordlist = ({ setAction }) => {
  console.log("hit");

  const { vocabularyId } = useParams();
  const { vocabState, compUpdate, actions } = useContext(Context);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    setFetching(true);
    api({ ...getWordsOptions, params: vocabularyId })
      .then((words) => {
        console.log("words fetched");
        actions({
          type: "setVocabState",
          payload: {
            ...vocabState,
            words,
          },
        });
        setFetching(false);
      })
      .catch((err) => {
        setFetching(true);
        console.log(err);
      });
  }, [compUpdate]);

  const createWord = useCallback(
    () =>
      setAction({
        config: createWordOptions,
        payload: { ...newWord, vocabularyId: vocabularyId },
        actionNames,
      }),
    []
  );
  const editWord = useCallback(
    (word) =>
      setAction({
        config: { ...editWordOptions, params: word._id, title: word.title },
        payload: word,
        actionNames: ["setFormConfig", "setInitialState", "toggleModal"],
      }),
    []
  );
  return (
    <List
      Component={Word}
      fetching={fetching}
      editItem={editWord}
      items={vocabState.words}
      createItem={createWord}
      listName="Words"
    />
  );
};
export default React.memo(StateHandler(Wordlist));

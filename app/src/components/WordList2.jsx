import React from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Word from "./Word.jsx";
import { useContext, useEffect } from "react";
import Context from "../store/context";
import { getWordsOptions, createWordOptions } from "../utils/defaultAPIConfig";
import { newWord } from "../utils/defaultInitialValues";
import { StateHandler } from "./StateHandler.jsx";
const Wordlist = ({ setAction }) => {
  const { vocabularyId } = useParams();
  console.log(vocabularyId);
  const { vocabState, compUpdate, actions } = useContext(Context);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];
  useEffect(() => {
    api({ ...getWordsOptions, params: vocabularyId })
      .then(words => {
        actions({
          type: "setVocabState",
          payload: {
            ...vocabState,
            words
          }
        });
      })
      .catch(err => console.log(err));
  }, [compUpdate]);
  const createWord = () => {
    setAction({
      config: createWordOptions,
      payload: { ...newWord, vocabularyId: vocabularyId },
      actionNames
    });
  };
  return (
    <div>
      <button onClick={createWord}>add word</button>
      {vocabState.words.map(word => (
        <Word key={word._id} word={word} />
      ))}
    </div>
  );
};
export default StateHandler(Wordlist);

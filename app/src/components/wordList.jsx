import React from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Word from "./Word.jsx";
import { useContext, useEffect } from "react";
import Context from "../store/context";
import { getWordsOptions, createWordOptions } from "../utils/defaultAPIConfig";
import { newWord } from "../utils/defaultInitialValues";
import { StateHandler } from "./StateHandler.jsx";
import { FormikForm } from "./form.jsx";
import Modal from "./Modal.jsx";
import RoundedBtn from "../views/_RoundedBtn.jsx";
const Wordlist = ({ setAction }) => {
  const { vocabularyId } = useParams();
  const { vocabState, compUpdate, actions } = useContext(Context);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];
  useEffect(() => {
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
      })
      .catch((err) => console.log(err));
  }, []);
  const createWord = () => {
    setAction({
      config: createWordOptions,
      payload: { ...newWord, vocabularyId: vocabularyId },
      actionNames,
    });
  };
  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">Words </h3>
        <RoundedBtn onClick={createWord} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {vocabState.words.map((word) => (
          <Word key={word._id} word={word} />
        ))}
      </div>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(Wordlist));

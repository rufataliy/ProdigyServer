import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Word from "./Word.jsx";
import { useContext, useEffect, useCallback } from "react";
import Context from "../store/context";
import {
  getWordsOptions,
  createWordOptions,
  editWordOptions,
} from "../utils/defaultAPIConfig";
import { newWord } from "../utils/defaultInitialValues";
import { StateHandler } from "./StateHandler.jsx";
import RoundedBtn from "../views/_RoundedBtn.jsx";
import { Spinner } from "react-bootstrap";
import Loading from "../views/_Loading.jsx";
const Wordlist = ({ setAction }) => {
  const { vocabularyId } = useParams();
  const { vocabState, compUpdate, actions } = useContext(Context);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];
  const [fetching, setFetching] = useState(false);
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
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">Words </h3>
        <RoundedBtn onClick={createWord} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && vocabState.words ? (
          vocabState.words.map((word) => (
            <Word editWord={editWord} key={word._id} word={word} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(Wordlist));

import React from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Word from "./Word.jsx";
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
  return (
    <div>
      {vocabState.words.map(word => (
        <Word word={word} />
      ))}
    </div>
  );
};
export default Wordlist;

import React, { useState, useContext, useEffect, useCallback } from "react";
import { useDelete, useCreate, useEdit } from "../../customHooks";
import { useParams, useRouteMatch } from "react-router-dom";
import Context from "../../store/context";
import api from "../../api/api";
import { getWordsOptions } from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import Word from "./Word.jsx";

const Wordlist = () => {
  const [remove] = useDelete("words");
  const [create] = useCreate("words");
  const [edit] = useEdit("words");
  const {
    vocabState,
    compUpdate,
    actions,
    appState: {
      author: { _id: userId },
    },
  } = useContext(Context);
  const [fetching, setFetching] = useState(true);
  const { url } = useRouteMatch();
  const { vocabularyId } = useParams();
  const [extendable, setExtendable] = useState();

  useEffect(() => {
    setFetching(true);
    api({ ...getWordsOptions, endpoint: url })
      .then(({ extendable, items }) => {
        setExtendable(extendable);
        actions({
          type: "setVocabState",
          payload: {
            ...vocabState,
            words: items,
          },
        });
        setFetching(false);
      })
      .catch((err) => {
        setFetching(true);
        console.log(err);
      });
  }, [compUpdate]);
  const parentId = vocabularyId;
  return (
    <List
      userId={userId}
      Component={Word}
      extendable={extendable}
      listName="Words"
      items={vocabState.words}
      createItem={() => create({ parentId })}
      editItem={edit}
      deleteItem={remove}
      fetching={fetching}
    />
  );
};
export default React.memo(Wordlist);

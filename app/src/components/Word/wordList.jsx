import React, { useState, useContext, useEffect, useCallback } from "react";
import { useDelete, useCreate, useEdit } from "../../customHooks/";
import { useParams, useRouteMatch } from "react-router-dom";
import Context from "../../store/context";
import api from "../../api/api";
import { getWordsOptions } from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import Word from "./Word.jsx";

const Wordlist = () => {
  const { vocabularyId } = useParams();
  const [remove] = useDelete("words");
  const [create] = useCreate("words");
  const [edit] = useEdit("words");
  const { vocabState, compUpdate, actions } = useContext(Context);
  const [fetching, setFetching] = useState(true);
  const { url } = useRouteMatch();

  useEffect(() => {
    setFetching(true);
    api({ ...getWordsOptions, endpoint: url })
      .then((words) => {
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

  return (
    <List
      Component={Word}
      listName="Words"
      items={vocabState.words}
      createItem={create}
      editItem={edit}
      deleteItem={remove}
      fetching={fetching}
    />
  );
};
export default React.memo(Wordlist);

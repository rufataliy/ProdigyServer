import React, { useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import api from "../../api/api.js";
import { VOCAB } from "../../store/useGlobalState";
import { getVocabularyOptions } from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import ListItem from "../../views/_ListItem.jsx";
import { useDelete, useCreate, useEdit } from "../../customHooks/";

const VocabularyList = () => {
  const [remove] = useDelete("vocabularies");
  const [create] = useCreate("vocabularies");
  const [edit] = useEdit("vocabularies");
  const { actions, vocabState, compUpdate } = useContext(Context);
  const [fetching, setFetching] = useState(true);

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

  return (
    <List
      Component={ListItem}
      listName="Vocabularies"
      childRoute="words"
      items={vocabState.vocabs}
      createItem={create}
      editItem={edit}
      deleteItem={remove}
      fetching={fetching}
    />
  );
};
export default React.memo(VocabularyList);

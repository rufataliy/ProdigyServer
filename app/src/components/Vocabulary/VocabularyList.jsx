import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import { useUpdateComponent, useVocabState } from "../../store/useGlobalState";
import { getVocabularyOptions } from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import ListItem from "../../views/_ListItem.jsx";
import { useDelete, useCreate, useEdit } from "../../customHooks/";

const VocabularyList = () => {
  const [remove] = useDelete("vocabularies");
  const [create] = useCreate("vocabularies");
  const [edit] = useEdit("vocabularies");
  const [fetching, setFetching] = useState(true);
  const [extendable, setExtendable] = useState();
  const [vocabState, setVocabState] = useVocabState();
  const [compUpdate] = useUpdateComponent();

  useEffect(() => {
    setFetching(true);
    api(getVocabularyOptions)
      .then(({ extendable, items }) => {
        setExtendable(extendable);
        setVocabState({
          ...vocabState,
          vocabs: items,
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
      extendable={extendable}
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

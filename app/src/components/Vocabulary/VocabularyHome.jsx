import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { StateHandler } from "../StateHandler.jsx";
import VocabularyList from "./VocabularyList.jsx";
import Wordlist from "../Word/WordList.jsx";

const VocabularyHome = (props) => {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route path={`${path}/vocabularies/:vocabularyId`}>
        <Wordlist />
      </Route>
      <Route exact path={path} component={VocabularyList} />
    </React.Fragment>
  );
};
export default React.memo(StateHandler(VocabularyHome));

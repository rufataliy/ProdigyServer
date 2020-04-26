import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { StateHandler } from "./StateHandler.jsx";
import VocabularyList from "./VocabularyList.jsx";
import Wordlist from "./WordList.jsx";

const VocabularyHome = (props) => {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route exact path={path} component={VocabularyList} />
      <Route path={`${path}/words/:vocabularyId`}>
        <Wordlist />
      </Route>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(VocabularyHome));

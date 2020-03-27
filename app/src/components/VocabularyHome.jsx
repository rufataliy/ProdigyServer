import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { StateHandler } from "./StateHandler.jsx";
import VocabularyList from "./VocabularyList.jsx";
import Wordlist from "./WordList2.jsx";
const VocabularyHome = props => {
  const { path } = useRouteMatch();

  return (
    <div>
      <Route exact path={path} component={VocabularyList} />
      <Route path={`${path}/:vocabId`}>
        <Wordlist />
      </Route>
    </div>
  );
};
export default StateHandler(VocabularyHome);

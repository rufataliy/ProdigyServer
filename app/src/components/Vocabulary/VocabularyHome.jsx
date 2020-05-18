import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import VocabularyList from "./VocabularyList.jsx";
import Wordlist from "../Word/WordList.jsx";

const VocabularyHome = (props) => {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route exact path={`${path}/:vocabularyId/words`}>
        <Wordlist />
      </Route>
      <Route exact path={path} component={VocabularyList} />
    </React.Fragment>
  );
};
export default React.memo(VocabularyHome);

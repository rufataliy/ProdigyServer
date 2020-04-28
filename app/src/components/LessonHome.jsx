import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { StateHandler } from "./StateHandler.jsx";
import LessonList from "./LessonList.jsx";
import SectionList from "./SectionList.jsx";
const LessonHome = (props) => {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route exact path={path} component={LessonList} />
      <Route path={`${path}/lessons/:lessonId`}>
        <SectionList />
      </Route>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(LessonHome));

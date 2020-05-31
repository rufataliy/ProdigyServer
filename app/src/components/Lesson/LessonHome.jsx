import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import LessonList from "./LessonList.jsx";
import SectionList from "../Section/SectionList.jsx";
const LessonHome = (props) => {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route exact path={path} component={LessonList} />
      <Route path={`${path}/:lessonId/sections`} component={SectionList} />
    </React.Fragment>
  );
};
export default React.memo(LessonHome);

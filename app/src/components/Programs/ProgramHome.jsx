import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import { StateHandler } from "../StateHandler.jsx";
import LessonList from "../Lesson/LessonList.jsx";
import SectionList from "../Section/SectionList.jsx";
import ProgramList from "./ProgramList.jsx";

const ProgramHome = (props) => {
  const { path } = useRouteMatch();

  return (
    <React.Fragment>
      <Route exact path={path} component={ProgramList} />
      <Route
        exact
        path={`${path}/programs/:programId/`}
        component={LessonList}
      />
      <Route
        path={`${path}/programs/lessons/:lessonId`}
        component={SectionList}
      />
    </React.Fragment>
  );
};
export default React.memo(StateHandler(ProgramHome));

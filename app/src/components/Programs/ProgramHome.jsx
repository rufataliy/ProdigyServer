// import React from "react";
// import { Route, useRouteMatch } from "react-router-dom";
// import { StateHandler } from "../StateHandler.jsx";
// import LessonList from "../Lesson/LessonList.jsx";
// import SectionList from "../Section/SectionList.jsx";
// import ProgramList from "./ProgramList.jsx";
// const ProgramHome = (props) => {
//   const { path } = useRouteMatch();

//   return (
//     <React.Fragment>
//       <Route exact path={path} component={ProgramList} />
//       <Route
//         exact
//         path={`${path}/lessons/:programId/`}
//         component={LessonList}
//       />
//       <Route path={`${path}/lessons/:lessonId`}>
//         <SectionList />
//       </Route>
//     </React.Fragment>
//   );
// };
// export default React.memo(StateHandler(ProgramHome));

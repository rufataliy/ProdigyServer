import React, { useContext, useEffect, useState, useCallback } from "react";
import Lesson from "./Lesson.jsx";
import Context from "../store/context";
import api from "../api/api.js";
import { LESSON } from "../store/useGlobalState";
import { StateHandler } from "./StateHandler.jsx";
import { newLesson } from "../utils/defaultInitialValues.js";
import {
  getLessonOptions,
  createLessonOptions,
  editLessonOptions,
} from "../utils/defaultAPIConfig";
import Loading from "../views/_Loading.jsx";
import RoundedBtn from "../views/_RoundedBtn.jsx";
const LessonList = ({ setAction }) => {
  const { actions, lessonState, compUpdate } = useContext(Context);
  const [fetching, setFetching] = useState(false);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    api(getLessonOptions)
      .then((lessons) => {
        console.log(lessons);
        actions({
          type: LESSON,
          payload: {
            ...lessonState,
            lessons,
          },
        });
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err);
      });
    return () => (mounted = false);
  }, [compUpdate]);

  const createlesson = () => {
    setAction({
      config: createLessonOptions,
      payload: newLesson,
      actionNames,
    });
  };
  const editLesson = useCallback(
    (lesson) =>
      setAction({
        config: {
          ...editLessonOptions,
          params: lesson._id,
          title: lesson.title,
        },
        payload: lesson,
        actionNames: ["setFormConfig", "setInitialState", "toggleModal"],
      }),
    []
  );
  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">Lessons </h3>
        <RoundedBtn onClick={createlesson} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && lessonState.lessons ? (
          lessonState.lessons.map((lesson) => (
            <Lesson editLesson={editLesson} key={lesson._id} lesson={lesson} />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(LessonList));

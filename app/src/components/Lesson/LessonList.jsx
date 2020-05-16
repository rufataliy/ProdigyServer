import React, { useContext, useEffect, useState, useCallback } from "react";
import Lesson from "./Lesson.jsx";
import Context from "../../store/context";
import api from "../../api/api.js";
import { LESSON } from "../../store/useGlobalState";
import { StateHandler } from "../StateHandler.jsx";
import { newLesson } from "../../utils/defaultInitialValues.js";
import {
  getLessonOptions,
  createLessonOptions,
  editLessonOptions,
} from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import ListItem from "../../views/_ListItem.jsx";
import { useParams, useRouteMatch } from "react-router-dom";

const LessonList = ({ setAction }) => {
  const { actions, lessonState, compUpdate } = useContext(Context);
  const [fetching, setFetching] = useState(true);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];
  const { programId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    mounted &&
      api({ ...getLessonOptions, url })
        .then((lessons) => {
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

  const createLesson = () => {
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
      <List
        Component={ListItem}
        fetching={fetching}
        editItem={editLesson}
        items={lessonState.lessons}
        createItem={createLesson}
        listName="Lessons"
        childRoute="sections"
      />
    </React.Fragment>
  );
};
export default React.memo(StateHandler(LessonList));

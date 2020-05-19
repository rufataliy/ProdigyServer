import React, { useContext, useEffect, useState, useCallback } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import { useDelete, useCreate, useEdit } from "../../customHooks/";
import Context from "../../store/context";
import api from "../../api/api.js";
import { LESSON } from "../../store/useGlobalState";
import { StateHandler } from "../StateHandler.jsx";
import { getLessonOptions } from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import ListItem from "../../views/_ListItem.jsx";

const LessonList = ({ setAction }) => {
  const { actions, lessonState, compUpdate } = useContext(Context);
  const [fetching, setFetching] = useState(true);
  const [remove] = useDelete("lessons");
  const [create] = useCreate("lessons");
  const [edit] = useEdit("lessons");
  const { url } = useRouteMatch();
  const { programId = "" } = useParams();

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    mounted &&
      api({ ...getLessonOptions, endpoint: url })
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

  return (
    <React.Fragment>
      <List
        Component={ListItem}
        fetching={fetching}
        createItem={() => create(programId)}
        editItem={edit}
        deleteItem={remove}
        items={lessonState.lessons}
        listName="Lessons"
        childRoute="sections"
      />
    </React.Fragment>
  );
};
export default React.memo(StateHandler(LessonList));

import React, { useEffect, useState } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import { useDelete, useCreate, useEdit } from "../../customHooks/";
import api from "../../api/api.js";
import { uselessonState, useUpdateComponent } from "../../store/useGlobalState";
import { getLessonOptions } from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import ListItem from "../../views/_ListItem.jsx";

const LessonList = () => {
  const [lessonState, setLessonState] = uselessonState();
  const [compUpdate] = useUpdateComponent();
  const [fetching, setFetching] = useState(true);
  const [remove] = useDelete("lessons");
  const [create] = useCreate("lessons");
  const [edit] = useEdit("lessons");
  const { url } = useRouteMatch();
  const { programId = "" } = useParams();
  const [extendable, setExtendable] = useState();

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    mounted &&
      api({ ...getLessonOptions, endpoint: url })
        .then(({ extendable, items: lessons }) => {
          setExtendable(extendable);
          setLessonState({
            ...lessonState,
            lessons,
          });

          setFetching(false);
        })
        .catch((err) => {
          setFetching(false);
          console.log(err);
        });
    return () => (mounted = false);
  }, [compUpdate]);

  const parentId = programId;

  return (
    <React.Fragment>
      <List
        extendable={extendable}
        Component={ListItem}
        fetching={fetching}
        createItem={() => create({ parentId })}
        editItem={edit}
        deleteItem={remove}
        items={lessonState.lessons}
        listName="Lessons"
        childRoute="sections"
      />
    </React.Fragment>
  );
};
export default React.memo(LessonList);

import React, { useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import api from "../../api/api";
import { useContext, useEffect, useCallback } from "react";
import Context from "../../store/context";
import { LESSON } from "../../store/useGlobalState";
import {
  getSectionsOptions,
  createSectionOptions,
  editSectionOptions,
} from "../../utils/defaultAPIConfig";
import { newSection } from "../../utils/defaultInitialValues";
import { StateHandler } from "../StateHandler.jsx";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import Loading from "../../views/_Loading.jsx";
import Tabs from "../../views/_Tabs.jsx";
import { useCreate, useEdit, useDelete } from "../../customHooks";
const Sectionlist = ({ setAction }) => {
  const [create] = useCreate("sections");
  const [edit] = useEdit("sections");
  const [remove] = useDelete("sections");
  const { lessonState, compUpdate, actions } = useContext(Context);
  const [fetching, setFetching] = useState(true);
  const { lessonId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    mounted &&
      api({ ...getSectionsOptions, endpoint: url })
        .then((sections) => {
          mounted &&
            actions({
              type: LESSON,
              payload: {
                ...lessonState,
                sections,
              },
            });
          setFetching(false);
        })
        .catch((err) => {
          setFetching(true);
          console.log(err);
        });
    return () => (mounted = false);
  }, [compUpdate]);

  const createSection = useCallback(
    () =>
      setAction({
        config: { ...createSectionOptions, modalType: "FormikForm" },
        payload: { ...newSection, lessonIdList: [lessonId] },
        actionNames,
      }),
    []
  );
  const editSection = useCallback(
    (section) =>
      setAction({
        config: {
          ...editSectionOptions,
          endpoint: editSectionOptions.endpoint + section._id,
          modalType: "FormikForm",
          title: section.title,
        },
        payload: section,
        actionNames: ["setFormConfig", "setInitialState", "toggleModal"],
      }),
    []
  );
  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">Sections </h3>
        <RoundedBtn onClick={() => create(lessonId)} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && lessonState.sections ? (
          <Tabs remove={remove} edit={edit} items={lessonState.sections} />
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(Sectionlist));

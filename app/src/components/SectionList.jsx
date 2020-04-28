import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useContext, useEffect, useCallback } from "react";
import Context from "../store/context";
import { LESSON } from "../store/useGlobalState";
import {
  getSectionsOptions,
  createSectionOptions,
  editSectionOptions,
} from "../utils/defaultAPIConfig";
import { newSection } from "../utils/defaultInitialValues";
import { StateHandler } from "./StateHandler.jsx";
import RoundedBtn from "../views/_RoundedBtn.jsx";
import Loading from "../views/_Loading.jsx";
const Sectionlist = ({ setAction }) => {
  const { lessonId } = useParams();
  const { lessonState, compUpdate, actions } = useContext(Context);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    api({ ...getSectionsOptions, params: lessonId })
      .then((sections) => {
        console.log("sections fetched");
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
  }, [compUpdate]);

  const createSection = useCallback(
    () =>
      setAction({
        config: createSectionOptions,
        payload: { ...newSection, vocabularyId: vocabularyId },
        actionNames,
      }),
    []
  );
  const editSection = useCallback(
    (section) =>
      setAction({
        config: {
          ...editSectionOptions,
          params: section._id,
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
        <RoundedBtn onClick={createSection} iconName="fas fa-plus" />
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && lessonState.sections ? (
          lessonState.sections.map((section) => (
            <Section
              editSection={editSection}
              key={section._id}
              section={section}
            />
          ))
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  );
};
export default React.memo(StateHandler(Sectionlist));

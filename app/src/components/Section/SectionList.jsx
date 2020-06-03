import React, { useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import api from "../../api/api";
import { useContext, useEffect } from "react";
import Context from "../../store/context";
import { LESSON } from "../../store/useGlobalState";
import { getSectionsOptions } from "../../utils/defaultAPIConfig";
import RoundedBtn from "../../views/_RoundedBtn.jsx";
import Loading from "../../views/_Loading.jsx";
import Tabs from "../../views/_Tabs.jsx";
import { useCreate, useEdit, useDelete } from "../../customHooks";

const Sectionlist = () => {
  const [create] = useCreate("sections");
  const [edit] = useEdit("sections");
  const [remove] = useDelete("sections");
  const {
    lessonState,
    compUpdate,
    appState: {
      author: { _id: userId },
    },
    actions,
  } = useContext(Context);
  const [fetching, setFetching] = useState(true);
  const { lessonId } = useParams();
  const { url } = useRouteMatch();
  const [extendable, setExtendable] = useState();

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    mounted &&
      api({ ...getSectionsOptions, endpoint: url })
        .then(({ extendable, sections }) => {
          setExtendable(extendable);
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

  return (
    <React.Fragment>
      <div className="d-flex p-3 align-items-center">
        <h3 className="text-primary mb-0 mr-3">Sections </h3>
        {extendable && (
          <RoundedBtn
            onClick={() => create({ parentId: lessonId })}
            iconName="fas fa-plus"
          />
        )}
      </div>
      <div className="d-flex flex-wrap">
        {!fetching && lessonState.sections ? (
          <Tabs
            userId={userId}
            remove={remove}
            edit={edit}
            items={lessonState.sections}
          />
        ) : (
          <Loading />
        )}
      </div>
    </React.Fragment>
  );
};
export default React.memo(Sectionlist);

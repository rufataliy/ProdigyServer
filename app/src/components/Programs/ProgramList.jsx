import React, { useContext, useEffect, useState, useCallback } from "react";
import Context from "../../store/context";
import api from "../../api/api.js";
import { PROGRAM } from "../../store/useGlobalState";
import { StateHandler } from "../StateHandler.jsx";
import { newProgram } from "../../utils/defaultInitialValues.js";
import {
  getProgramsOptions,
  createProgramOptions,
  editProgramOptions,
} from "../../utils/defaultAPIConfig";
import List from "../../views/_List.jsx";
import ListItem from "../../views/_ListItem.jsx";
import { useRouteMatch } from "react-router-dom";
import { useDelete, useCreate, useEdit } from "../../customHooks/";

const ProgramList = ({ setAction }) => {
  const { actions, programState, compUpdate } = useContext(Context);
  const [remove] = useDelete("programs");
  const [create] = useCreate("programs");
  const [edit] = useEdit("programs");
  const [fetching, setFetching] = useState(true);
  const actionNames = ["setFormConfig", "setInitialState", "toggleModal"];
  const { url } = useRouteMatch();

  useEffect(() => {
    let mounted = true;
    setFetching(true);
    mounted &&
      api({ ...getProgramsOptions, endpoint: url })
        .then((programs) => {
          actions({
            type: PROGRAM,
            payload: {
              ...programState,
              programs,
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

  const createProgram = () => {
    setAction({
      config: { ...createProgramOptions, modalType: "FormikForm" },
      payload: newProgram,
      actionNames,
    });
  };
  const editProgram = useCallback(
    (program) =>
      setAction({
        config: {
          ...editProgramOptions,
          endpoint: editProgramOptions.endpoint + program._id,
          modalType: "FormikForm",
          title: program.title,
        },
        payload: program,
        actionNames,
      }),
    []
  );
  return (
    <React.Fragment>
      <List
        Component={ListItem}
        fetching={fetching}
        editItem={edit}
        items={programState.programs}
        createItem={create}
        deleteItem={remove}
        listName="Programs"
        childRoute="lessons"
      />
    </React.Fragment>
  );
};
export default React.memo(StateHandler(ProgramList));

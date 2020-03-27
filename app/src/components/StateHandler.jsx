import React, { useContext } from "react";
import Context from "../store/context";
import {
  MODAL,
  SCHEDULE,
  INITIAL_VALUES,
  FORM_CONFIG,
  COMP_UPDATE,
  APP,
  VOCAB,
  WORDS,
  TOPICS
} from "../store/useGlobalState";

export const StateHandler = Component => {
  return () => {
    const { actions, modalState, scheduleState } = useContext(Context);

    const setAction = ({ config, payload, actionNames }) => {
      const ops = {
        setFormConfig: () =>
          actions({
            type: FORM_CONFIG,
            payload: config
          }),
        setInitialState: () =>
          actions({
            type: INITIAL_VALUES,
            payload: {
              ...payload
            }
          }),
        setScheduleState: () =>
          actions({
            type: SCHEDULE,
            payload: {
              ...scheduleState,
              events: payload
            }
          }),
        toggleModal: () =>
          actions({
            type: MODAL,
            payload: {
              ...modalState,
              modalVisibility: !modalState.modalVisibility
            }
          })
      };
      actionNames.map(name => {
        ops[name]();
      });
    };
    return <Component setAction={setAction} />;
  };
};

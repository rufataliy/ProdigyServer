import React, { useContext } from "react";
import Context from "../store/context";
import { SCHEDULE, INITIAL_VALUES, FORM_CONFIG } from "../store/useGlobalState";
import { useMemo } from "react";

export const StateHandler = (Component) => {
  return (props) => {
    const { actions, toggleModal, scheduleState } = useContext(Context);
    const setAction = useMemo(
      () => ({ config, payload, actionNames }) => {
        const ops = {
          setFormConfig: () =>
            actions({
              type: FORM_CONFIG,
              payload: config,
            }),
          setInitialState: () =>
            actions({
              type: INITIAL_VALUES,
              payload: {
                ...payload,
              },
            }),
          setScheduleState: () =>
            actions({
              type: SCHEDULE,
              payload: {
                ...scheduleState,
                events: payload,
              },
            }),
          toggleModal: toggleModal,
        };
        actionNames.map((name) => {
          ops[name]();
        });
      },
      [Context]
    );
    return <Component {...props} setAction={setAction} />;
  };
};

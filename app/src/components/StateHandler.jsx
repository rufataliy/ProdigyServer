import React, { useContext } from "react";
import Context from "../store/context";
export const StateHandler = Component => {
  return () => {
    const { actions, modalState } = useContext(Context);

    const setAction = ({ config, initialValues, actionNames }) => {
      const ops = {
        setFormConfig: () =>
          actions({
            type: "setFormConfig",
            payload: config
          }),
        setInitialState: () =>
          actions({
            type: "setInitialValues",
            payload: initialValues
          }),
        toggleModal: () =>
          actions({
            type: "setModalState",
            payload: {
              ...modalState,
              modalVisibility: !modalState.modalVisibility
            }
          })
      };
      actionNames.map(name => {
        console.log("called");

        ops[name]();
      });
    };
    return <Component setAction={setAction} />;
  };
};

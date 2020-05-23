import Context from "../store/context";
import { useContext } from "react";
import { INITIAL_VALUES, FORM_CONFIG } from "../store/useGlobalState";
import { initialValues } from "../utils/defaultInitialValues";

export const useCreate = (collectionName) => {
  const { actions, toggleModal } = useContext(Context);
  const create = (options = {}) => {
    const { parentId = "", extraValues = {} } = options;
    const config = {
      method: "post",
      endpoint: `/app/${collectionName}/${parentId}`,
      title: "Create",
      modalType: "FormikForm",
      collectionName,
    };
    actions({
      type: FORM_CONFIG,
      payload: config,
    });
    actions({
      type: INITIAL_VALUES,
      payload: { ...initialValues[collectionName], ...extraValues },
    });
    toggleModal();
  };
  return [create];
};

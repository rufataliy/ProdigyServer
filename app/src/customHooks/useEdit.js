import Context from "../store/context";
import { useContext } from "react";
import { FORM_CONFIG, INITIAL_VALUES } from "../store/useGlobalState";
import { initialValues } from "../utils/defaultInitialValues";

export const useEdit = (collectionName) => {
  const { actions, toggleModal } = useContext(Context);

  const edit = (item) => {
    const config = {
      method: "put",
      endpoint: `/app/${collectionName}/edit/${item._id}`,
      title: item.title,
      modalType: "FormikForm",
      collectionName,
    };
    actions({
      type: FORM_CONFIG,
      payload: config,
    });
    actions({
      type: INITIAL_VALUES,
      payload: item,
    });
    toggleModal();
  };
  return [edit];
};

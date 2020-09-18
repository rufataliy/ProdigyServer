import Context from "../store/context";
import { useContext } from "react";
import {
  useAppState,
  useFormConfig,
  useModalState,
  useInitialValues,
} from "../store/useGlobalState";

export const useEdit = (collectionName) => {
  const [appState, setAppState] = useAppState();
  const [modalState, toggleModal] = useModalState();
  const [formState, setFormState] = useFormConfig();
  const [initialValues, setInitialValues] = useInitialValues();
  const userid = appState.author._id;

  const edit = (item) => {
    const config = {
      method: "put",
      endpoint: `/app/${collectionName}/edit/${item._id}`,
      title: item.title,
      modalType: "FormikForm",
      isAuthor: item.author === userid,
      collectionName,
    };

    setFormState({ ...formState, ...config });
    setInitialValues({ ...initialValues, ...item });
    toggleModal();
  };
  return [edit];
};

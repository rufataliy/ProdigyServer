import {
  useModalState,
  useInitialValues,
  useFormConfig,
} from "../store/useGlobalState";
import { initialValues as defaultInitialValues } from "../utils/defaultInitialValues";

export const useCreate = (collectionName) => {
  const [modalState, toggleModal] = useModalState();
  const [formState, setFormState] = useFormConfig();
  const [initialValues, setInitialValues] = useInitialValues();

  const create = (options = {}) => {
    const { parentId = "", extraValues = {} } = options;
    const config = {
      method: "post",
      endpoint: `/app/${collectionName}/${parentId}`,
      title: "Create",
      modalType: "FormikForm",
      isAuthor: true,
      collectionName,
    };
    setInitialValues({
      ...defaultInitialValues[collectionName],
      ...extraValues,
    });
    setFormState({ ...formState, ...config });
    toggleModal();
  };
  return [create];
};

import {
  useAppState,
  useFormConfig,
  useModalState,
} from "../store/useGlobalState";

export const useDelete = (collectioName) => {
  const [appState, setAppState] = useAppState();
  const [modalState, toggleModal] = useModalState();
  const [formState, setFormState] = useFormConfig();
  const userid = appState?.author?._id;

  const remove = (item) => {
    const config = {
      method: "delete",
      endpoint: `/app/${collectioName}/delete/${item._id}`,
      title: item.title,
      modalType: "DeleteConfirm",
      isAuthor: item._id === userid,
    };

    setFormState({ ...formState, ...config });
    toggleModal();
  };
  return [remove];
};

import Context from "../store/context";
import { useContext } from "react";
import { FORM_CONFIG } from "../store/useGlobalState";

export const useDelete = (collectioName) => {
  const {
    actions,
    toggleModal,
    appState: {
      author: { _id },
    },
  } = useContext(Context);
  const remove = (item) => {
    const config = {
      method: "delete",
      endpoint: `/app/${collectioName}/delete/${item._id}`,
      title: item.title,
      modalType: "DeleteConfirm",
      isAuthor: item._id === _id,
    };
    actions({
      type: FORM_CONFIG,
      payload: config,
    });
    toggleModal();
  };
  return [remove];
};

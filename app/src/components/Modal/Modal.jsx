import React, { useContext } from "react";
import { Modal as BoostrapModal } from "react-bootstrap";
import Context from "../../store/context";
import { MODAL } from "../../store/useGlobalState";
import { FormikForm } from "../Form/form.jsx";
import DeleteConfirm from "./DeleteConfirm.jsx";

const children = {
  FormikForm: <FormikForm />,
  DeleteConfirm: <DeleteConfirm />,
};

const Modal = (props) => {
  const { modalState, actions, formConfig } = useContext(Context);
  const onHide = () => {
    actions({
      type: MODAL,
      payload: { ...modalState, modalVisibility: false },
    });
  };

  return (
    <BoostrapModal
      onHide={onHide}
      show={modalState.modalVisibility}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BoostrapModal.Header closeButton>
        <BoostrapModal.Title id="contained-modal-title-vcenter">
          {formConfig.title}
        </BoostrapModal.Title>
      </BoostrapModal.Header>
      {children[formConfig.modalType]}
    </BoostrapModal>
  );
};

export default Modal;

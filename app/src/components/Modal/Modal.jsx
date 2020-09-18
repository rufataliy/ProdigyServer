import React from "react";
import { useFormConfig, useModalState } from "../../store/useGlobalState";
import { FormikForm } from "../Form/Form.jsx";
import DeleteConfirm from "./DeleteConfirm.jsx";
import { CModal, CModalHeader, CModalTitle } from "@coreui/react";
import { formConfig as defaultValues } from "../../utils/defaultInitialValues";

const children = {
  FormikForm: <FormikForm />,
  DeleteConfirm: <DeleteConfirm />,
};

const Modal = (props) => {
  const [modalState, toggleModal] = useModalState();
  const [formConfig, setFormConfig] = useFormConfig();

  const onHide = () => {
    setFormConfig(defaultValues);
    toggleModal();
  };

  return (
    <div className="modal-dialog-scrollable">
      <CModal
        onClose={onHide}
        show={modalState.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <CModalHeader closeButton>
          <CModalTitle id="contained-modal-title-vcenter">
            {formConfig.title}
          </CModalTitle>
        </CModalHeader>
        {modalState.show ? children[formConfig.modalType] : null}
      </CModal>
    </div>
  );
};

export default Modal;

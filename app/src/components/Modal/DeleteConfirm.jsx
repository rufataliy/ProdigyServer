import React from "react";
import api from "../../api/api";
import {
  useModalState,
  useUpdateComponent,
  useFormConfig,
} from "../../store/useGlobalState";
import { formConfig } from "../../utils/defaultInitialValues";
import { CModalBody, CModalFooter, CButton } from "@coreui/react";

const DeleteConfirm = () => {
  const [modalState, toggleModal] = useModalState();
  const [compUpdate, updateComponent] = useUpdateComponent();
  const [formState, setFormState] = useFormConfig();

  const handleDelete = () => {
    api(formState)
      .then((deleted) => {
        if (deleted) {
          setFormState(formConfig);
          toggleModal();
          updateComponent();
        }
      })
      .catch(console.log);
  };
  return (
    <div>
      <CModalBody>
        <h4>Are you sure?</h4>
      </CModalBody>
      <CModalFooter>
        <CButton
          onClick={() => {
            setFormState(formConfig);
            toggleModal();
          }}
          variant="secondary"
        >
          Close
        </CButton>
        <CButton onClick={handleDelete} variant="danger">
          Delete
        </CButton>
      </CModalFooter>
    </div>
  );
};

export default DeleteConfirm;

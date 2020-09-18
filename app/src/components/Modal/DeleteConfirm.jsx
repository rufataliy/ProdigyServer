import React from "react";
import { Modal, Button } from "react-bootstrap";
import api from "../../api/api";
import {
  useModalState,
  useUpdateComponent,
  useFormConfig,
} from "../../store/useGlobalState";
import { formConfig } from "../../utils/defaultInitialValues";

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
      <Modal.Body>
        <h4>Are you sure?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setFormState(formConfig);
            toggleModal();
          }}
          variant="secondary"
        >
          Close
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default DeleteConfirm;

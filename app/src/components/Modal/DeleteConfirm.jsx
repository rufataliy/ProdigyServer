import React, { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "../../api/api";
import Context from "../../store/context";
import { MODAL, COMP_UPDATE } from "../../store/useGlobalState";

const DeleteConfirm = () => {
  const { modalState, actions, compUpdate, formConfig } = useContext(Context);
  const close = () => {
    actions({
      type: MODAL,
      payload: { ...modalState, modalVisibility: false },
    });
    actions({
      type: COMP_UPDATE,
      payload: {
        compUpdate: !compUpdate,
      },
    });
  };
  const handleDelete = () => {
    api(formConfig)
      .then((deleted) => {
        if (deleted) {
          close();
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
        <Button onClick={close} variant="secondary">
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

import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import Context from "../store/context";
import { FormikForm } from "./form.jsx";
import { MODAL } from "../store/useGlobalState";
const BootModal = props => {
  const { modalState, actions } = useContext(Context);
  const onHide = () => {
    actions({
      type: MODAL,
      payload: { ...modalState, modalVisibility: false }
    });
  };
  console.log(props);

  return (
    <Modal
      onHide={onHide}
      show={modalState.modalVisibility}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default BootModal;

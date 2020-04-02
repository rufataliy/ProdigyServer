import React, { useContext } from "react";
import { Modal as BoostrapModal } from "react-bootstrap";
import Context from "../store/context";
import { MODAL } from "../store/useGlobalState";
const Modal = props => {
  const { modalState, actions } = useContext(Context);
  const onHide = () => {
    actions({
      type: MODAL,
      payload: { ...modalState, modalVisibility: false }
    });
  };
  return (
    <BoostrapModal
      title={props.title}
      onHide={onHide}
      show={modalState.modalVisibility}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BoostrapModal.Header closeButton>
        <BoostrapModal.Title id="contained-modal-title-vcenter">
          {props.title}
        </BoostrapModal.Title>
      </BoostrapModal.Header>
      <BoostrapModal.Body>{props.children}</BoostrapModal.Body>
    </BoostrapModal>
  );
};

export default Modal;

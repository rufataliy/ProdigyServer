import { Modal } from "antd";
import React, { useContext } from "react";
import api from "../api/api";
import Context from "../store/context";
const ModalComp = props => {
  const handleCancel = () => {
    props.nonSubmit();
    // here should be function to empty all initial values
  };

  return (
    <div>
      <Modal
        title={props.title}
        visible={props.isVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {props.children}
      </Modal>
    </div>
  );
};

export default ModalComp;

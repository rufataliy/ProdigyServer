import { Modal } from 'antd';
import React, { useContext } from "react"
import Context from "../store/context"
const ModalComp = (props) => {
    const handleCancel = () => {
        props.nonSubmit()
    };
    console.log(props.isVisible);

    return (
        <div>
            <Modal title={props.title}
                visible={props.isVisible}
                onCancel={handleCancel}
                footer={null} >
                {props.children}
            </Modal>
        </div>
    );
}

export default ModalComp
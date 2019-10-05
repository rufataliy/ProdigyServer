import { Modal } from 'antd';
import React, { useContext } from "react"
import Context from "../store/context"
const ModalComp = (props) => {
    const { state, actions } = useContext(Context)
    const { modalVisibility } = state
    // const showModal = () => {
    //     this.setState({
    //         visible: true,
    //     });
    // };

    // handleOk = () => {
    //     console.log(this.props.children.props);

    // };

    const handleCancel = () => {
        props.nonSubmit()
    };


    return (
        <div>
            <Modal title={props.title}
                visible={modalVisibility}
                onCancel={handleCancel}
                footer={null} >
                {props.children}
            </Modal>
        </div>
    );
}

export default ModalComp
import { Modal } from 'antd';
import React, {useContext} from "react"
class ModalComp extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    visible: this.props.state,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
   this.props.onSubmit()
  };

  handleCancel = () => {
    this.props.nonSubmit()
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

export default ModalComp
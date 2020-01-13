import React, { useContext } from "react"
import Context from "../store/context"
import ModalComp from "./Modal.jsx"
import { FormikForm } from "./form.jsx"


const FormModal = (props) => {
    const { modalState, formConfig } = useContext(Context)
    return (
        <ModalComp
            isVisible={modalState.modalVisibility}
            nonSubmit={props.toggleModal}
            onSubmit={props.toggleModal}
            title={formConfig.title}
        >
            <FormikForm
                formType={formConfig.formType}
                collectionName={formConfig.collectionName}
                docId={formConfig.docId}
                method={formConfig.method}
                handleDelete={props.handleDelete}
            />
        </ModalComp>
    )
}

export default FormModal
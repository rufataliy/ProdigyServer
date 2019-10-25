import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import moment from "moment"

export const FormikForm = (props) => {
    console.log(props);
    const { initialValuesGlobal, scheduleState, actions } = useContext(Context)
    const initialValuesConverted = {
        ...initialValuesGlobal.newClass,
        date: moment(initialValuesGlobal.newClass.date)
    }

    const { formType } = props
    const handleSubmit = (values) => {
        console.log(props);
        const submitValues = { ...values, date: moment(values.date).format() }
        newClassForm.dbPath(props, submitValues)();
        actions({
            type: "setScheduleState",
            payload: { ...scheduleState, modalVisibility: !scheduleState.modalVisibility }
        })
    }
    return (
        <Formik
            initialValues={initialValuesConverted}
            onSubmit={handleSubmit}
            render={(props) => (
                <Form>
                    {newClassForm.fields(formType)}
                </Form>
            )}
        />
    )
}

// export const FormikForm = withFormik({
//     mapPropsToValues: (props) => {
//         newClassForm.defaultValues(props).newClass
//     },
//     handleSubmit: (values, MyForm) => {
//         const { collectionName, method } = MyForm.props
//         newClassForm.dbPath(collectionName, method, values);
//         console.log(values);

//     }
// })(MyForm)
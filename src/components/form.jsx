import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import moment from "moment"

export const FormikForm = (props) => {
    const { initialValuesGlobal, scheduleState, actions } = useContext(Context)
    const initialValuesConverted = {
        ...initialValuesGlobal.newClass,
        date: moment(initialValuesGlobal.newClass.date)
    }

    const formProps = props
    const handleSubmit = (values) => {
        const submitValues = { ...values, date: moment(values.date).format() }
        newClassForm.dbPath(props, submitValues)().then(() => {
            actions({
                type: "setScheduleState",
                payload: {
                    ...scheduleState,
                    modalVisibility: !scheduleState.modalVisibility,
                    scheduleUpdate: !scheduleState.scheduleUpdate
                }
            })
        }).catch(() => console.log("couldn't submit"))

    }
    return (
        <Formik
            initialValues={initialValuesConverted}
            onSubmit={handleSubmit}
            render={(props) => (
                <Form>
                    {newClassForm.fields(formProps)}
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
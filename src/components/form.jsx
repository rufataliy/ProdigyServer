import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import moment from "moment"
import { MODAL, SCHEDULE } from "../store/useGlobalState"
import { deflateSync } from "zlib"

export const FormikForm = (props) => {
    const { initialValues, scheduleState, modalState, actions } = useContext(Context)
    console.log("formikFOrm rendered");
    const initialValuesConverted = {
        ...initialValues.newClass,
        date: moment(initialValues.newClass.date)
    }

    const formProps = props
    const handleSubmit = (values) => {
        console.log("from submission");

        const submitValues = {
            ...values,
            start: moment(values.start).format(),
            end: moment(values.end).format(),
            date: moment(values.date).format()
        }

        newClassForm.dbPath(props, submitValues)().then(() => {
            console.log(submitValues);

            actions({
                type: MODAL,
                payload: {
                    ...modalState, modalVisibility: !modalState.modalVisibility
                }
            })
            actions({
                type: SCHEDULE,
                payload: {
                    ...scheduleState,
                    scheduleUpdate: !scheduleState.scheduleUpdate
                }
            })
        })
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
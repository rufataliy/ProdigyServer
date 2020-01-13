import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import moment from "moment"
import { MODAL, COMP_UPDATE } from "../store/useGlobalState"

export const FormikForm = (props) => {
    const { initialValues, compUpdate, modalState, appState, actions } = useContext(Context)
    console.log("formikFOrm rendered");
    console.log(props);
    // const initialValuesConverted = {
    //     ...initialValues.newClass,
    //     start: moment(initialValues.newClass.start),
    //     end: moment(initialValues.newClass.end),
    //     startTime: moment(initialValues.newClass.startTime),
    //     endTime: moment(initialValues.newClass.endTime)
    // }
    console.log(initialValues);

    const formProps = props
    const handleSubmit = (values) => {
        console.log("from submission");
        console.log(appState);

        const submitValues = {
            ...values,
            start: moment(values.start).format(),
            end: moment(values.end).format(),
            startTime: moment(values.startTime).format(),
            endTime: moment(values.endTime).format(),
            author: appState.uid
        }
        console.log(submitValues);

        newClassForm.dbPath(props, submitValues)().then(() => {
            console.log(submitValues);
            actions({
                type: MODAL,
                payload: {
                    ...modalState, modalVisibility: !modalState.modalVisibility
                }
            })
            actions({
                type: COMP_UPDATE,
                payload: {
                    compUpdate: !compUpdate
                }
            })
        })
    }
    return (
        <Formik
            initialValues={initialValues[formProps.formType]}
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
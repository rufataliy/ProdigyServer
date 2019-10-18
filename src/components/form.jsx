import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"
import moment from "moment"

export const FormikForm = (props) => {
    const { initialValuesGlobal } = useContext(Context)
    const initialValuesConverted = {
        ...initialValuesGlobal.newClass,
        date: moment(initialValuesGlobal.newClass.date)
    }

    const { collectionName, method, formType } = props
    const handleSubmit = (values) => {
        const submitValues = { ...values, date: moment(values.date).format() }
        newClassForm.dbPath(collectionName, method, submitValues)();
        console.log(submitValues)
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
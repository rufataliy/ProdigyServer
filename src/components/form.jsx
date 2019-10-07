import React, { useContext, useEffect } from "react"
import { Formik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
import Context from "../store/context"

export const FormikForm = (props) => {
    const { collectionName, method, formType } = props
    const { initialValues } = useContext(Context)
    const handleSubmit = (values) => {
        newClassForm.dbPath(collectionName, method, values);
        console.log(initialValues);
    }
    return (
        // <Form onSubmit={props.handleSubmit} >
        //     {newClassForm.fields(props)}
        // </Form >
        <Formik
            initialValues={initialValues.newClass}
            onSubmit={handleSubmit}
            render={(props) => (
                <Form>
                    {console.log(initialValues.newClass)
                    }
                    {newClassForm.fields(formType, initialValues.newClass.date)}
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
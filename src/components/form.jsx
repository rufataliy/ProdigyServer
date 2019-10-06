import React from "react"
import { withFormik, Formik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"

export const FormikForm = (props) => {
    const handleSubmit = (values) => {
        const { collectionName, method } = props
        newClassForm.dbPath(collectionName, method, values);
        console.log(values);

    }
    return (
        // <Form onSubmit={props.handleSubmit} >
        //     {newClassForm.fields(props)}
        // </Form >
        <Formik
            initalValues={newClassForm.defaultValues(props).newClass}
            onSubmit={handleSubmit}
            render={() => (
                <Form>
                    {newClassForm.fields(props)}
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
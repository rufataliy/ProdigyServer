import React from "react"
import { withFormik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
const MyForm = (props) => (

    < div >
        <Form onSubmit={props.handleSubmit} >
            {newClassForm.fields(props)}
            < button type="submit">Submit</button>
        </Form >
    </div >
)

export const FormikForm = withFormik(
    {
        mapPropsToValues: (props) => {
            newClassForm.defaultValues(props).newClass
        },
        handleSubmit: (values) => {
            console.log(values);

            // newClassForm.dbPath().newClass(values)
        }
    }
)(MyForm)



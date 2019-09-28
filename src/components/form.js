import React from "react"
import { withFormik, Form } from "formik"
import { newClassForm } from "./_newClassTmp.jsx"
const MyForm = () => (
    <div>
        <Form>
            {newClassForm.fields().newClass}
            <button type="submit">Submit</button>
        </Form>
    </div>
)

export const FormikForm = withFormik(
    {
        mapPropsToValues: () => {
            newClassForm.defaultValues().newClass
        },
        handleSubmit: (values) => {
            newClassForm.dbPath().newClass(values)
        }
    }
)(MyForm)



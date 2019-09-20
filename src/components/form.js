import React from "react"
import { withFormik, Field, Form } from "formik"
import { InputText, InputEmail } from "./inputs";
const MyForm = () => (
    <div>
        <Form>
            <Field type="text"
                name="name"
                placeholder="Your name" />
            <button type="submit">Submit</button>
        </Form>
    </div>
)

export const FormikForm = withFormik(
    {
        mapPropsToValues: () => {
            {
                name: ""
            }
        },
        handleSubmit: (values) => {
            alert(values.name)
        }
    }
)(MyForm)



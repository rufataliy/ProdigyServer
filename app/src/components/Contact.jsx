import React from "react";
import { FormikForm } from "./form.jsx"

class Contact extends React.Component {


    render() {
        return (
            <div >
                <FormikForm formType="newClass"
                    collectionName="classes"
                    method="update"
                />
            </div>
        )
    }
}

export default Contact
import React from "react";
import { FormikForm } from "./form"
import { db } from "../firebase/firebase"

class Contact extends React.Component {


    render() {
        db.collection("classes").get().
            then(querySnapshot =>
                querySnapshot.forEach(async doc => {
                    const response = await doc.data();
                    console.log({ ...{ id: doc.id }, response });

                }))

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
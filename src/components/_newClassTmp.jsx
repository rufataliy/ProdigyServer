import React from "react"
import { Field } from "formik"
import firebase from "firebase"


export const newClassForm = (() => {
    const fields = () =>
        (
            {
                "newClass": < React.Fragment >
                    <Field type="text"
                        name="level"
                        placeholder="Level" />
                    <Field type="text"
                        name="type"
                        placeholder="Type" />
                    <Field type="text"
                        name="origin"
                        placeholder="Origin" />
                </React.Fragment >,
                "newVocabulary": < React.Fragment >
                    <Field type="text"
                        name="Word"
                        placeholder="Word" />
                    <Field type="text"
                        name="Example"
                        placeholder="Example" />
                    <Field type="text"
                        name="Definition"
                        placeholder="Definition" />
                </React.Fragment >
            }

        )

    const defaultValues = () => (

        {
            newClass: {
                level: "",
                type: "",
                origin: ""
            },
            newVocabulary: {
                word: "",
                example: "",
                definition: ""
            }

        }
    )
    const dbPath = () => {
        const db = firebase.firestore()
        return {
            newClass: (values) => db.collection("classes").add(values)
        }

    }

    return {
        fields: fields,
        defaultValues: defaultValues,
        dbPath: dbPath
    }
})()

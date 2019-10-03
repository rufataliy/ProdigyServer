import React from "react"
import { Input, Radio } from "antd"
import firebase from "firebase"
import { db } from "../firebase/firebase"

export const newClassForm = (() => {
    const fields = (props) => {
        const field = {
            newClass:
                < React.Fragment >
                    <Input placeholder="Level"
                        type="text"
                        name="level"
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        value={props.values.level}
                    />
                    <Radio.Group name="classType"
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        value={props.values.classType}>
                        <Radio.Button value="individual">Individual</Radio.Button>
                        <Radio.Button value="group">Group</Radio.Button>
                    </Radio.Group>
                    <Input
                        type="text"
                        name="origin"
                        placeholder="Origin"
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        value={props.values.origin}
                    />
                </React.Fragment >,
            newVocabulary:
                < React.Fragment >
                    <Input type="text"
                        name="word"
                        placeholder="Word"
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        value={props.values.word} />
                    <Input type="text"
                        name="example"
                        placeholder="Example"
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        value={props.values.example} />
                    <Input type="text"
                        name="definition"
                        placeholder="Definition"
                        onBlur={props.handleBlur}
                        onChange={props.handleChange}
                        value={props.values.definition} />
                </React.Fragment >
        }
        return field[props.formType]

    }

    const defaultValues = ({ formType }) => {
        const defaultValue = {
            newClass: {
                level: "",
                type: "",
                origin: "",
                classType: "Not Selected"
            },
            newVocabulary: {
                word: "",
                example: "",
                definition: ""
            }
        }
        return defaultValue[formType]
    }
    const dbPath = (collectionName, method, values) => {
        const dbMethod = {
            add: (() => db.collection(collectionName).add(values))(),
            update: (() => db.collection(collectionName).doc("BPsVviQrZMHofxgm5954").update(values))()
        }
        return dbMethod[method];

    }

    return {
        fields: fields,
        defaultValues: defaultValues,
        dbPath: dbPath
    }
})()


import React from "react"
import { Input, Radio } from "antd"
import firebase from "firebase"

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
                    {
                        console.log(props)
                    }
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

    const defaultValues = (props) => {
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
        return defaultValue[props.formType]
    }
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


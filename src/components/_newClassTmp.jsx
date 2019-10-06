import React, { createRef } from "react"
import { Input, Radio, SubmitButton, DatePicker, TimePicker } from "@jbuschke/formik-antd"
import firebase from "firebase"
import { db } from "../firebase/firebase"
import moment from "moment"
export const newClassForm = (() => {
    const fields = (props) => {
        const field = {
            newClass:
                < React.Fragment >
                    <DatePicker name="date"
                    />
                    <TimePicker name="time"
                        format='HH:mm'
                    />
                    <Input name="level"
                        placeholder="Level"
                    />
                    <Radio.Group name="classType">
                        <Radio.Button value="individual">Individual</Radio.Button>
                        <Radio.Button value="group">Group</Radio.Button>
                    </Radio.Group>
                    <Input name="origin"
                        type="text"
                        placeholder="Origin"
                    />
                    <button type="submit">
                        Submit
                    </button>
                </React.Fragment >,
            newVocabulary:
                < React.Fragment >
                    <Input type="text"
                        name="word"
                        placeholder="Word"
                    />
                    <Input type="text"
                        name="example"
                        placeholder="Example"
                    />
                    <Input type="text"
                        name="definition"
                        placeholder="Definition"
                    />
                    <SubmitButton />
                </React.Fragment >
        }
        return field[props.formType]

    }

    const defaultValues = ({ formType }) => {
        const defaultValue = {
            newClass: {
                date: {},
                time: {},
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


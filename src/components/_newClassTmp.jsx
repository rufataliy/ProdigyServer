import React from "react"
import { Input, Radio, SubmitButton, DatePicker, TimePicker } from "@jbuschke/formik-antd"
import { db } from "../firebase/firebase"
import { database } from "firebase"

export const newClassForm = (() => {
    const fields = (formType) => {
        const field = {
            newClass:
                < React.Fragment >
                    <Input name="title"
                        placeholder="Title"
                    />
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
        return field[formType]

    }

    /*const defaultValues = (formType) => {

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
    }*/
    const dbPath = (collectionName, method, values) => {
        const dbMethod = {
            add: () => db.collection(collectionName).add(values),
            update: () => db.collection(collectionName).doc("BPsVviQrZMHofxgm5954").update(values),
            get: async () => {

                const data = await db
                    .collection(collectionName)
                    .get()
                    .then(function (querySnapshot) {
                        let a = []
                        querySnapshot.forEach(function (doc) {
                            const response = { id: doc.id, ...doc.data() }
                            a.push(response)
                        })
                        return a
                    })
                return data
            }
        }
        return dbMethod[method];
    }

    return {
        fields: fields,
        //defaultValues: defaultValues,
        dbPath: dbPath
    }
})()


import React from "react"
import { Input, Radio, SubmitButton, DatePicker, TimePicker, Checkbox } from "@jbuschke/formik-antd"
import { Button } from "antd"
import { db } from "../firebase/firebase"

export const newClassForm = (() => {
    const fields = (props) => {
        console.log(props);
        const daysOptions = [
            { label: "Sunday", value: 0 },
            { label: "Monday", value: 1 },
            { label: "Tuesday", value: 2 },
            { label: "Wednesday", value: 3 },
            { label: "Thursday", value: 4 },
            { label: "Friday", value: 5 },
            { label: "Saturday", value: 6 }
        ]
        const field = {

            newClass:
                < React.Fragment >
                    <Input name="title"
                        placeholder="Title"
                    />
                    <Checkbox.Group name="daysOfWeek" options={daysOptions} />
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
                    <Button htmlType="submit" type="primary">
                        {props.method != "update" ? "Submit" : "Update"}
                    </Button>
                    {props.method == "update" &&
                        <Button onClick={props.handleDelete} type="danger">
                            Delete
                        </Button>}
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
    //
    const dbPath = (props, values) => {
        const dbMethod = {
            add: () => db.collection(props.collectionName).add(values),
            update: () => db.collection(props.collectionName).doc(props.docId).update(values),
            delete: () => db.collection(props.collectionName).doc(props.docId).delete().then(console.log("deleted")),
            get: async () => {
                const data = await db
                    .collection(props.collectionName)
                    .get()
                    .then(function (querySnapshot) {
                        let a = []
                        querySnapshot.forEach(function (doc) {
                            const response = { id: doc.id, ...doc.data() }
                            console.log("from get");

                            console.log(response);
                            if (response.daysOfWeek && response.daysOfWeek.length == 0) {
                                delete response.daysOfWeek
                            }
                            a.push(response)
                        })
                        return a
                    })
                return data
            }
        }
        return dbMethod[props.method];
    }

    return {
        fields: fields,
        dbPath: dbPath
    }
})()


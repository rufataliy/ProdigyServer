import { useState } from "react";
import moment from "moment"
const useGlobalState = () => {
    const globalState = {
        modalVisibility: false,
        calendarWeekends: true,
        calendarArgs: {},
        events: null
    }
    const initialValuesGlobal = {
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
    const [state, setState] = useState(globalState)
    const [initialValues, setValues] = useState(initialValuesGlobal)
    const actions = (action) => {
        const { type, payload } = action
        switch (type) {
            case "setState":
                return setState(payload)
            case "setInitialValues":
                return setValues(payload)
            default:
                return state, initialValues;
        }
    }

    return { state: state, initialValues: initialValues, actions }
}

export default useGlobalState
import { useState } from "react";
const useGlobalState = () => {
    const scheduleStateGlobal = {
        modalVisibility: false,
        calendarWeekends: true,
        events: []
    }
    const initialValuesGlobal = {
        newClass: {
            title: "",
            date: {},
            time: {},
            level: "",
            origin: "",
            classType: "Not Selected"
        },
        newVocabulary: {
            word: "",
            example: "",
            definition: ""
        }
    }

    const [state, setState] = useState(scheduleStateGlobal)
    const [initialValues, setValues] = useState(initialValuesGlobal)

    const actions = (action) => {
        const { type, payload } = action
        switch (type) {
            case "setScheduleState":
                return setState(payload)
            case "setInitialValues":
                return setValues(payload)
            default:
                return state, initialValues;
        }
    }

    return { scheduleState: state, initialValuesGlobal: initialValues, actions }
}

export default useGlobalState
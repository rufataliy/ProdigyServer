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
    const formConfigGlobal = {
        title: "",
        formType: "",
        docId: "",
        collectionName: "",
        method: ""
    }
    const [state, setState] = useState(scheduleStateGlobal)
    const [initialValues, setValues] = useState(initialValuesGlobal)
    const [formConfig, setFormConfig] = useState(formConfigGlobal)
    const actions = (action) => {
        const { type, payload } = action
        switch (type) {
            case "setScheduleState":
                return setState(payload)
            case "setInitialValues":
                return setValues(payload)
            case "setFormConfig":
                return setFormConfig(payload)
            default:
                return state, initialValues, formConfig;
        }
    }

    return {
        scheduleState: state,
        initialValuesGlobal: initialValues,
        formConfig: formConfig,
        actions
    }
}

export default useGlobalState
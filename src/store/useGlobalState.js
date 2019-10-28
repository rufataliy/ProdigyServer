import { useState } from "react";
const useGlobalState = () => {
    const appStateGlobal = {
        loggedIn: false
    }
    const scheduleStateGlobal = {
        modalVisibility: false,
        calendarWeekends: true,
        scheduleUpdate: false,
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
    const [appState, setAppState] = useState(appStateGlobal)
    const actions = (action) => {
        const { type, payload } = action
        switch (type) {
            case "setScheduleState":
                return setState(payload)
            case "setInitialValues":
                return setValues(payload)
            case "setFormConfig":
                return setFormConfig(payload)
            case "setAppState":
                return setAppState(payload)
            default:
                return state, initialValues, formConfig, appState;
        }
    }

    return {
        scheduleState: state,
        initialValuesGlobal: initialValues,
        formConfig: formConfig,
        appState: appState,
        actions
    }
}

export default useGlobalState
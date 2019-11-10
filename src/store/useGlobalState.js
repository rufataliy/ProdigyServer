import { useState } from "react";
const useGlobalState = () => {
    const appStateGlobal = {
        loggedIn: false
    }
    const tooltipStateGlobal = {
        show: false
    }
    const scheduleStateGlobal = {
        calendarWeekends: true,
        scheduleUpdate: false,
        events: []
    }
    const modalStateGlobal = {
        modalVisibility: false,
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
    const [tooltipState, setTooltipState] = useState(tooltipStateGlobal)
    const [modalState, setModalState] = useState(modalStateGlobal)
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
            case "setTooltipState":
                return setTooltipState(payload)
            case "setModalState":
                return setModalState(payload)
            default:
                return state, initialValues, formConfig, appState, tooltipState, modalState;
        }
    }

    return {
        scheduleState: state,
        initialValues: initialValues,
        formConfig: formConfig,
        appState: appState,
        tooltipState: tooltipState,
        modalState: modalState,
        actions
    }
}

export default useGlobalState
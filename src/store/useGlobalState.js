import { useState } from "react";

export const MODAL = "setModalState"
export const SCHEDULE = "setScheduleState"
export const INITIAL_VALUES = "setInitialValues"
export const FORM_CONFIG = "setFormConfig"
export const APP = "setAppState"

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
            start: {},
            end: {},
            level: "",
            origin: "",
            classType: "Not Selected",
            daysOfWeek: [],
            startRecur: {}
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
            case SCHEDULE:
                return setState(payload)
            case INITIAL_VALUES:
                return setValues(payload)
            case FORM_CONFIG:
                return setFormConfig(payload)
            case APP:
                return setAppState(payload)
            case "setTooltipState":
                return setTooltipState(payload)
            case MODAL:
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
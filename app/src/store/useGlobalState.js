import { useState } from "react";

export const MODAL = "setModalState"
export const SCHEDULE = "setScheduleState"
export const INITIAL_VALUES = "setInitialValues"
export const FORM_CONFIG = "setFormConfig"
export const COMP_UPDATE = "setComponentUpdate"
export const APP = "setAppState"
export const VOCAB = "setVocabState"
export const LESSON = "setLessonState"
export const WORDS = "allWords"
export const TOPICS = "topics"

const useGlobalState = () => {
    const componentUpdateGlobal = false
    const appStateGlobal = {
        loggedIn: false,
        author: ""
    }
    const tooltipStateGlobal = {
        show: false
    }
    const scheduleStateGlobal = {
        calendarWeekends: true,
        events: []
    }
    const modalStateGlobal = {
        modalVisibility: false,
    }
    const vocabStateGlobal = {
        vocabs: [],
        words: [],
        searchTerm: ""
    }
    const lessonStateGlobal = {
        lessons: [],
        sections: []
    }
    const initialValuesGlobal = {
        newClass: {
            title: "",
            start: "",
            end: "",
            startTime: "",
            endTime: "",
            level: "",
            origin: "",
            classType: "Not Selected",
            daysOfWeek: [],
            author: ""
        },
        newWord: {
            phrase: "",
            source: "",
            example: "",
            definition: "",
            topic: "",
            author: ""
        },
        newVocabulary: {
            name: "",
            topic: "",
            level: "",
            author: ""
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
    const [vocabState, setVocabState] = useState(vocabStateGlobal)
    const [lessonState, setLessonState] = useState(lessonStateGlobal)
    const [componentUpdate, setComponentUpdate] = useState(componentUpdateGlobal)

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
            case VOCAB:
                return setVocabState(payload)
            case LESSON:
                return setLessonState(payload)
            case COMP_UPDATE:
                return setComponentUpdate(payload)
            default:
                return state, initialValues, formConfig, appState, tooltipState, lessonState, modalState;
        }
    }

    const toggleModal = () => {
        actions({
            type: MODAL,
            payload: {
                ...modalState,
                modalVisibility: !modalState.modalVisibility,
            }
        });
    }
    return {
        scheduleState: state,
        initialValues: initialValues,
        formConfig: formConfig,
        appState: appState,
        tooltipState: tooltipState,
        modalState: modalState,
        vocabState: vocabState,
        compUpdate: componentUpdate,
        lessonState,
        toggleModal,
        actions
    }
}

export default useGlobalState
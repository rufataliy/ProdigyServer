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
export const PROGRAM = "setProgramState"

const useGlobalState = () => {
    const compUpdateGlobal = false
    const appStateGlobal = {
        loggedIn: false,
        author: ""
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
    const programStateGlobal = {
        programs: []
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
        method: "",
        modalSize: ""
    }
    const [scheduleState, setScheduleState] = useState(scheduleStateGlobal)
    const [initialValues, setValues] = useState(initialValuesGlobal)
    const [formConfig, setFormConfig] = useState(formConfigGlobal)
    const [appState, setAppState] = useState(appStateGlobal)
    const [modalState, setModalState] = useState(modalStateGlobal)
    const [vocabState, setVocabState] = useState(vocabStateGlobal)
    const [lessonState, setLessonState] = useState(lessonStateGlobal)
    const [programState, setProgramState] = useState(programStateGlobal)
    const [compUpdate, setCompUpdate] = useState(compUpdateGlobal)

    const actions = (action) => {
        const { type, payload } = action
        switch (type) {
            case SCHEDULE:
                return setScheduleState(payload)
            case INITIAL_VALUES:
                return setValues(payload)
            case FORM_CONFIG:
                return setFormConfig(payload)
            case APP:
                return setAppState(payload)
            case MODAL:
                return setModalState(payload)
            case VOCAB:
                return setVocabState(payload)
            case LESSON:
                return setLessonState(payload)
            case PROGRAM:
                return setProgramState(payload)
            case COMP_UPDATE:
                return setCompUpdate(payload)
            default:
                return scheduleState, initialValues, formConfig, programState, appState, lessonState, modalState, compUpdate;
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
        scheduleState,
        initialValues,
        formConfig,
        appState,
        modalState,
        vocabState,
        compUpdate,
        lessonState,
        toggleModal,
        programState,
        actions
    }
}

export default useGlobalState
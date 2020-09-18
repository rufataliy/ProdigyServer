import { useContext, useState } from "react";
import context from "./context";
export const MODAL = "setModalState";
export const SCHEDULE = "setScheduleState";
export const INITIAL_VALUES = "setInitialValues";
export const FORM_CONFIG = "setFormConfig";
export const COMP_UPDATE = "setComponentUpdate";
export const APP = "setAppState";
export const VOCAB = "setVocabState";
export const LESSON = "setLessonState";
export const WORDS = "allWords";
export const TOPICS = "topics";
export const PROGRAM = "setProgramState";

const useGlobalState = () => {
  const compUpdateGlobal = false;
  const appStateGlobal = {
    loggedIn: false,
    author: { _id: "", name: "unknown" },
    sidebarOpen: "responsive",
  };
  const scheduleStateGlobal = {
    calendarWeekends: true,
    events: [],
  };
  const modalStateGlobal = {
    show: false,
  };
  const vocabStateGlobal = {
    vocabs: [],
    words: [],
  };
  const programStateGlobal = {
    programs: [],
  };
  const lessonStateGlobal = {
    lessons: [],
    sections: [],
  };
  const initialValuesGlobal = {};
  const formConfigGlobal = {
    title: "",
    formType: "",
    docId: "",
    collectionName: "",
    method: "",
    modalSize: "",
    isAuthor: undefined,
  };
  const [scheduleState, setScheduleState] = useState(scheduleStateGlobal);
  const [initialValues, setValues] = useState(initialValuesGlobal);
  const [formConfig, setFormConfig] = useState(formConfigGlobal);
  const [appState, setAppState] = useState(appStateGlobal);
  const [modalState, setModalState] = useState(modalStateGlobal);
  const [vocabState, setVocabState] = useState(vocabStateGlobal);
  const [lessonState, setLessonState] = useState(lessonStateGlobal);
  const [programState, setProgramState] = useState(programStateGlobal);
  const [compUpdate, setCompUpdate] = useState(compUpdateGlobal);

  const actions = (action) => {
    const { type, payload } = action;
    switch (type) {
      case SCHEDULE:
        return setScheduleState(payload);
      case INITIAL_VALUES:
        return setValues(payload);
      case FORM_CONFIG:
        return setFormConfig(payload);
      case APP:
        return setAppState(payload);
      case MODAL:
        return setModalState(payload);
      case VOCAB:
        return setVocabState(payload);
      case LESSON:
        return setLessonState(payload);
      case PROGRAM:
        return setProgramState(payload);
      case COMP_UPDATE:
        return setCompUpdate(payload);
      default:
        return (
          vocabState,
          scheduleState,
          initialValues,
          formConfig,
          programState,
          appState,
          lessonState,
          modalState,
          compUpdate
        );
    }
  };

  return {
    scheduleState,
    initialValues,
    formConfig,
    appState,
    modalState,
    vocabState,
    compUpdate,
    lessonState,
    programState,
    actions,
  };
};

export default useGlobalState;

export const useUpdateComponent = () => {
  const { compUpdate, actions } = useContext(context);

  return [
    compUpdate,
    () => actions({ type: COMP_UPDATE, payload: { compUpdate: !compUpdate } }),
  ];
};

export const useAppState = () => {
  const { appState, actions } = useContext(context);

  const setAppState = (payload) => {
    actions({
      type: APP,
      payload,
    });
  };

  return [appState, setAppState];
};

export const useScheduleState = () => {
  const { scheduleState, actions } = useContext(context);
  const setScheduleState = (payload) => {
    actions({
      type: SCHEDULE,
      payload,
    });
  };

  return [scheduleState, setScheduleState];
};

export const useModalState = () => {
  const { modalState, actions } = useContext(context);

  const toggleModal = () => {
    actions({
      type: MODAL,
      payload: { ...modalState, show: !modalState.show },
    });
  };

  return [modalState, toggleModal];
};

export const useInitialValues = () => {
  const { initialValues, actions } = useContext(context);

  const setInitialValues = (payload) => {
    actions({
      type: INITIAL_VALUES,
      payload,
    });
  };

  return [initialValues, setInitialValues];
};

export const useFormConfig = () => {
  const { formConfig, actions } = useContext(context);
  const setFormConfig = (payload) => {
    actions({
      type: FORM_CONFIG,
      payload,
    });
  };

  return [formConfig, setFormConfig];
};

export const useProgramState = () => {
  const { programState, actions } = useContext(context);
  const setProgramState = (payload) => {
    actions({
      type: PROGRAM,
      payload,
    });
  };

  return [programState, setProgramState];
};

export const uselessonState = () => {
  const { lessonState, actions } = useContext(context);
  const setlessonState = (payload) => {
    actions({
      type: LESSON,
      payload,
    });
  };

  return [lessonState, setlessonState];
};

export const useVocabState = () => {
  const { vocabState, actions } = useContext(context);

  const setVocabState = (payload) => {
    actions({
      type: VOCAB,
      payload,
    });
  };

  return [vocabState, setVocabState];
};

export const getProgramNameById = (id) => {
  const {
    programState: { programs },
  } = useContext(context);
  console.log(programs);
  const program = programs.find((program) => program._id === id);
  return program && program.title;
};

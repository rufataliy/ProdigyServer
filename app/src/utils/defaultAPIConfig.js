export const createVocabularyOptions = {
    collectionName: "vocabularies",
    method: "post",
    title: "New vocabulary",
};
export const getVocabularyOptions = {
    collectionName: "vocabularies",
    method: "get",
};
export const editVocabularyOptions = {
    collectionName: "vocabularies",
    method: "put",
    params: "",
    title: "",
};
export const assignVocabularyOptions = {
    collectionName: "vocabularies/assignTo",
    method: "post",
    params: "",
};
export const getKlass = {
    collectionName: "klasses",
    method: "get",
    modalSize: "lg",
};
export const editKlass = {
    collectionName: "klasses",
    method: "put",
    modalSize: "lg",
};
export const createKlass = {
    collectionName: "klasses",
    method: "post",
    title: "New class",
    modalSize: "lg",
};
export const getStudentListOptions = {
    collectionName: "klasses/addStudent",
    method: "get",
    params: "",
};
export const getStudentOptions = {
    collectionName: "klasses/addStudent",
    method: "get",
    params: "",
};
export const getWordsOptions = {
    collectionName: "words",
    method: "get",
    params: "",
};
export const createWordOptions = {
    collectionName: "words",
    method: "post",
    title: "New word",
};
export const editWordOptions = {
    collectionName: "words",
    method: "put",
    params: "",
    title: "",
};
export const getChats = {
    collectionName: "chats",
    method: "get",
};
export const getContacts = {
    collectionName: "users",
    method: "get",
};
export const removeChatOptions = {
    collectionName: "chats",
    method: "delete",
};
export const getLessonOptions = {
    collectionName: "lessons",
    method: "get",
};
export const createLessonOptions = {
    collectionName: "lessons",
    method: "post",
    title: "New lesson",
};

export const editLessonOptions = {
    collectionName: "lessons",
    method: "put",
    params: "",
    title: "",
};
export const getSectionsOptions = {
    collectionName: "Sections",
    method: "get",
    modalSize: "lg",
};
export const createSectionOptions = {
    collectionName: "sections",
    method: "post",
    title: "New section",
    modalSize: "lg",
};

export const editSectionOptions = {
    collectionName: "sections",
    method: "put",
    modalSize: "lg",
};
export const getProgramsOptions = {
    collectionName: "programs",
    method: "get",
};
export const createProgramOptions = {
    collectionName: "programs",
    method: "post",
    title: "New program",
};

export const editProgramOptions = {
    collectionName: "programs",
    method: "put",
};
export const _buildApiOptions = ({ collectionName, method }) => ({
    collectionName,
    method,
});
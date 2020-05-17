export const createVocabularyOptions = {
  collectionName: "vocabularies",
  method: "post",
  endpoint: "/app/vocabularies/",
  title: "New vocabulary",
};
export const getVocabularyOptions = {
  collectionName: "vocabularies",
  method: "get",
};
export const editVocabularyOptions = {
  collectionName: "vocabularies",
  method: "PUT",
  params: "",
  endpoint: "/app/vocabularies/edit/",
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
  method: "PUT",
  endpoint: "/app/klasses/edit/",
  modalSize: "lg",
};
export const createKlass = {
  collectionName: "klasses",
  method: "post",
  endpoint: "/app/klasses/",
  title: "New class",
  modalSize: "lg",
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
  endpoint: "/app/words/",
  title: "New word",
};
export const editWordOptions = {
  collectionName: "words",
  method: "PUT",
  endpoint: "/app/words/edit/",
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
  endpoint: "/app/lessons/",
  title: "New lesson",
};

export const editLessonOptions = {
  collectionName: "lessons",
  method: "PUT",
  endpoint: "/app/lessons/edit/",
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
  endpoint: "/app/sections/",
  title: "New section",
  modalSize: "lg",
};

export const editSectionOptions = {
  collectionName: "sections",
  endpoint: "/app/sections/edit/",
  method: "PUT",
  modalSize: "lg",
};
export const getProgramsOptions = {
  collectionName: "programs",
  method: "get",
};
export const createProgramOptions = {
  collectionName: "programs",
  endpoint: "/app/programs/",
  method: "post",
  title: "New program",
};

export const editProgramOptions = {
  collectionName: "programs",
  endpoint: "/app/programs/edit/",
  method: "PUT",
};
export const _buildApiOptions = ({ collectionName, method }) => ({
  collectionName,
  method,
});

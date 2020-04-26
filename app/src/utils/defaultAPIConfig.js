export const getVocabulary = {
    collectionName: "vocabularies",
    method: "get",
};
export const editVocabulary = {
    collectionName: "vocabularies",
    method: "put",
    params: "",
    title: "",
};
export const createVocabulary = {
    collectionName: "vocabularies",
    method: "post",
    title: "New vocabulary"
};
export const assignVocabularyOptions = {
    collectionName: "vocabularies/assignTo",
    method: "post",
    params: "",
};
export const getKlass = {
    collectionName: "klasses",
    method: "get",
};
export const editKlass = {
    collectionName: "klasses",
    method: "put",
};
export const createKlass = {
    collectionName: "klasses",
    method: "post",
    title: "New class"
};
export const getStudentListOptions = {
    collectionName: "klasses/addStudent/byid",
    method: "get",
    params: "",
};
export const getStudentOptions = {
    collectionName: "klasses/addStudent/byemail",
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
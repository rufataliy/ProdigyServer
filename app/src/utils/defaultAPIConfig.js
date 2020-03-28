export const getVocabulary = {
    collectionName: "vocabularies",
    method: "get"
}
export const editVocabulary = {
    collectionName: "vocabularies",
    method: "put",
    docId: "",
    title: ""
}
export const createVocabulary = {
    collectionName: "vocabularies",
    method: "post"
}
export const getKlass = {
    collectionName: "klasses",
    method: "get"
}
export const editKlass = {
    collectionName: "klasses",
    method: "put"
}
export const createKlass = {
    collectionName: "klasses",
    method: "post"
}
export const getStudentListOptions = {
    collectionName: "klasses/addStudent/byid",
    method: "get",
    params: ""
}
export const getStudentOptions = {
    collectionName: "klasses/addStudent/byemail",
    method: "get",
    params: ""
}
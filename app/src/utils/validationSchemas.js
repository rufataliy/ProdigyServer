import * as Yup from "yup";

const klassListSchema = Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string().required()
});

export const vocabularySchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    topic: Yup.string("Please enter string values only").required("Required")
});
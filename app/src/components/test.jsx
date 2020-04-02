import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { newVocabulary } from "../utils/defaultInitialValues";
import { vocabularySchema } from "../utils/validationSchemas";

const handleSubmit = values => console.log(values);

export const ValidationSchemaExample = () => (
  <div>
    <h1>Playground component</h1>
  </div>
);

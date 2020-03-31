import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { newVocabulary } from "../utils/defaultInitialValues";
import { vocabularySchema } from "../utils/validationSchemas";

const handleSubmit = values => console.log(values);

export const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={newVocabulary}
      validationSchema={vocabularySchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" />
          {errors.name && touched.name ? <div>{errors.name}</div> : null}
          <Field name="topic" />
          {errors.topic && touched.topic ? <div>{errors.topic}</div> : null}
          <button type="submit">Submit</button>
          <pre>{JSON.stringify(errors)}</pre>
        </Form>
      )}
    </Formik>
  </div>
);

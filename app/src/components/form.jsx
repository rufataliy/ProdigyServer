import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { _formTemplates } from "./_formTemplates.jsx";
import Context from "../store/context";
import { MODAL, COMP_UPDATE } from "../store/useGlobalState";
import { vocabularySchema } from "../utils/validationSchemas.js";

export const FormikForm = () => {
  const {
    initialValues,
    compUpdate,
    modalState,
    appState,
    formConfig,
    actions,
  } = useContext(Context);
  console.log("formikForm rendered");
  const reset = () => {
    actions({
      type: MODAL,
      payload: {
        ...modalState,
        modalVisibility: !modalState.modalVisibility,
      },
    });
    actions({
      type: COMP_UPDATE,
      payload: {
        compUpdate: !compUpdate,
      },
    });
  };
  const handleSubmit = (values) => {
    console.log("handleSubmit");
    values.author = appState.author.sub;
    _formTemplates.dbPath[formConfig.method](formConfig, values)
      .then(() => {
        reset();
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = () => {
    const config = {
      ...formConfig,
      method: "delete",
    };
    _formTemplates.dbPath[config.method](config)
      .then(() => reset())
      .catch((err) => console.log(err));
  };
  return (
    <Formik
      // validationSchema={vocabularySchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          {_formTemplates.fields({ ...props, formConfig }, handleDelete)}
        </Form>
      )}
    </Formik>
  );
};

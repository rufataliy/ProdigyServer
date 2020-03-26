import React, { useContext, useEffect } from "react";
import { Formik, Form, useFormik } from "formik";

import { newClassForm } from "./_newClassTmp.jsx";
import Context from "../store/context";
import moment from "moment";
import { MODAL, COMP_UPDATE, FORM_CONFIG } from "../store/useGlobalState";

export const FormikForm = props => {
  const {
    initialValues,
    compUpdate,
    modalState,
    appState,
    formConfig,
    actions
  } = useContext(Context);
  console.log("formikFOrm rendered");
  const reset = () => {
    actions({
      type: MODAL,
      payload: {
        ...modalState,
        modalVisibility: !modalState.modalVisibility
      }
    });
    actions({
      type: COMP_UPDATE,
      payload: {
        compUpdate: !compUpdate
      }
    });
  };
  const handleSubmit = values => {
    console.log("handleSubmit");
    console.log(values);
    values.author = appState.author.sub;
    newClassForm.dbPath[formConfig.method](formConfig, values)
      .then(() => {
        reset();
      })
      .catch(err => console.log(err));
  };
  const handleDelete = () => {
    const config = {
      ...formConfig,
      method: "delete"
    };
    newClassForm.dbPath[config.method](config)
      .then(() => reset())
      .catch(err => console.log(err));
  };

  return (
    <Formik
      initialValues={initialValues[formConfig.formType]}
      onSubmit={handleSubmit}
    >
      {props => {
        return <Form>{newClassForm.fields(formConfig, handleDelete)}</Form>;
      }}
    </Formik>
  );
};

// export const FormikForm = withFormik({
//     mapPropsToValues: (props) => {
//         newClassForm.defaultValues(props).newClass
//     },
//     handleSubmit: (values, MyForm) => {
//         const { collectionName, method } = MyForm.props
//         newClassForm.dbPath(collectionName, method, values);
//         console.log(values);

//     }
// })(MyForm)

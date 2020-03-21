import React, { useContext, useEffect } from "react";
import { Formik, Form, useFormik } from "formik";

import { newClassForm } from "./_newClassTmp.jsx";
import Context from "../store/context";
import moment from "moment";
import { MODAL, COMP_UPDATE } from "../store/useGlobalState";

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
  // const initialValuesConverted = {
  //     ...initialValues.newClass,
  //     start: moment(initialValues.newClass.start),
  //     end: moment(initialValues.newClass.end),
  //     startTime: moment(initialValues.newClass.startTime),
  //     endTime: moment(initialValues.newClass.endTime)
  // }

  const handleSubmit = values => {
    const submitValues = {
      ...values,
      start: moment(values.start).format(),
      end: moment(values.end).format(),
      startTime: moment(values.startTime).format(),
      endTime: moment(values.endTime).format(),
      author: appState.uid
    };
    newClassForm.dbPath[formConfig.method](formConfig, submitValues)
      .then(() => {
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
      })
      .catch(err => console.log(err));
  };
  // const formik = useFormik({
  //   initialValues: initialValues[formProps.formType],
  //   onSubmit: handleSubmit
  // });
  return (
    <Formik
      initialValues={initialValues[formConfig.formType]}
      onSubmit={handleSubmit}
    >
      {props => {
        return <Form>{newClassForm.fields(formConfig)}</Form>;
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

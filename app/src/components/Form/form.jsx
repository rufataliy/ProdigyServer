import React, { useContext } from "react";
import { Formik, Form } from "formik";
import Context from "../../store/context";
import {
  MODAL,
  COMP_UPDATE,
  INITIAL_VALUES,
  FORM_CONFIG,
} from "../../store/useGlobalState";
import { vocabularySchema } from "../../utils/validationSchemas.js";
import { useEffect } from "react";
import api from "../../api/api";
import { Modal, Button, Form as FormBootstrap } from "react-bootstrap";
import { getTemplate } from "./templates/getTemplate.js";

export const FormikForm = () => {
  const {
    initialValues,
    compUpdate,
    modalState,
    appState,
    formConfig,
    actions,
  } = useContext(Context);
  useEffect(() => {
    return () => {
      actions({ type: INITIAL_VALUES, payload: {} });
      actions({ type: FORM_CONFIG, payload: {} });
    };
  }, []);
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
    values.author = appState.author._id;
    api(formConfig, values)
      .then(() => {
        reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Formik
      // validationSchema={vocabularySchema}
      initialValues={initialValues}
      // onSubmit={handleSubmit}
    >
      {(props) => (
        <>
          <Modal.Body>
            <Form>{getTemplate(props, formConfig)}</Form>
          </Modal.Body>
          <Modal.Footer>
            <FormBootstrap.Group>
              <Button
                type="submit"
                onClick={() => handleSubmit(props.values)}
                className="btn-sm"
                type="primary"
              >
                {formConfig.method != "put" ? "Save" : "Update"}
              </Button>
            </FormBootstrap.Group>
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
};

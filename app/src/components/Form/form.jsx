import React from "react";
import { Formik, Form } from "formik";
import { useEffect } from "react";
import api from "../../api/api";
import { Button, Form as FormBootstrap } from "react-bootstrap";
import { getTemplate } from "./templates/getTemplate.js";
import {
  useInitialValues,
  useFormConfig,
  useModalState,
  useUpdateComponent,
} from "../../store/useGlobalState";
import { CModalBody, CModalFooter } from "@coreui/react";
import { formConfig } from "../../utils/defaultInitialValues";

export const FormikForm = () => {
  const [compUpdate, updateComponent] = useUpdateComponent();
  const [modalState, toggleModal] = useModalState();
  const [formState, setFormState] = useFormConfig();
  const [initialValues, setInitialValues] = useInitialValues();

  useEffect(() => {
    return () => {
      setInitialValues({});
      setFormState({});
    };
  }, []);

  const reset = () => {
    setFormState(formConfig);
    toggleModal();
    updateComponent();
  };

  const handleSubmit = (values) => {
    api(formState, values)
      .then(() => {
        reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Formik initialValues={initialValues}>
      {(props) => (
        <>
          <CModalBody>
            <Form>{getTemplate(props, formState)}</Form>
          </CModalBody>
          <CModalFooter>
            <FormBootstrap.Group>
              <Button
                disabled={!formState.isAuthor}
                hidden={!formState.isAuthor}
                type="submit"
                onClick={() => handleSubmit(props.values)}
                className="btn-sm"
                type="primary"
              >
                {formState.method != "put" ? "Save" : "Update"}
              </Button>
            </FormBootstrap.Group>
          </CModalFooter>
        </>
      )}
    </Formik>
  );
};

import React from "react";
import { Field, FieldArray } from "formik";
import AddToList from "../AddToList.jsx";
import { CFormGroup, CContainer, CRow, CCol, CLabel } from "@coreui/react";

const Lessons = ({ errors, touched }) => {
  return (
    <CContainer>
      <CRow>
        <CCol className={"col-12 col-md-6"}>
          <CFormGroup>
            <CLabel>Title</CLabel>
            <Field
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter a title"
            />
            <p className="text-danger">
              {touched.title && errors.title ? errors.title : null}
            </p>
          </CFormGroup>
          <CFormGroup>
            <CLabel>Level</CLabel>
            <Field
              type="text"
              className="form-control"
              name="level"
              placeholder="Enter level"
            />
            <p className="text-danger">{touched.level && errors.level}</p>
          </CFormGroup>
        </CCol>
        <CCol className={"col-12 col-md-6"}>
          <CCol xs={12} className={"p-0"}>
            <CLabel>Add sections</CLabel>
            <FieldArray name="sectionList">
              {({
                push,
                remove,
                form: { values, initialValues, setFieldValue },
              }) => {
                return (
                  <Field>
                    {({ field }) => (
                      <AddToList
                        values={values}
                        setFieldValue={setFieldValue}
                        push={push}
                        remove={remove}
                        collectionName="sections"
                        initialList={initialValues.sectionList}
                      />
                    )}
                  </Field>
                );
              }}
            </FieldArray>
          </CCol>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Lessons;

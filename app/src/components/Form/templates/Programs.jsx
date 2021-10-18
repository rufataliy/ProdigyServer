import React from "react";
import { Field, FieldArray } from "formik";
import AddToList from "../AddToList.jsx";
import { CFormGroup, CContainer, CCol, CRow, CLabel } from "@coreui/react";

const Programs = ({ errors, touched }) => {
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
              placeholder="Enter title"
            />
            <p className="text-danger">
              {touched.title && errors.title ? errors.title : null}
            </p>
          </CFormGroup>
        </CCol>
        <CCol className={"col-12 col-md-6"}>
          <CFormGroup>
            <CLabel>Description</CLabel>
            <Field
              type="text"
              className="form-control"
              name="description"
              placeholder="Enter description"
            />
            <p className="text-danger">{touched.level && errors.level}</p>
          </CFormGroup>
        </CCol>
        <CCol className={"col-12 col-md-6"}>
          <CCol xs={12} className={"p-0"}>
            Add lessons
            <FieldArray name="lessonList">
              {({
                push,
                remove,
                form: { values, initialValues, setFieldValue },
              }) => {
                return (
                  <Field>
                    {() => (
                      <AddToList
                        push={push}
                        remove={remove}
                        collectionName="lessons"
                        removedListField="removedLessonsList"
                        values={values}
                        setFieldValue={setFieldValue}
                        initialList={initialValues.lessonList}
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

export default Programs;

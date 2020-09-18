import React from "react";
import { Field } from "formik";
import { CContainer, CFormGroup, CRow, CCol, CLabel } from "@coreui/react";

const Vocabularies = ({ errors, touched }) => {
  return (
    <CContainer>
      <CRow>
        <CCol className={"col-12"}>
          <CFormGroup>
            <CLabel>Title</CLabel>
            <Field
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter a title"
            />
            <p className="text-danger">
              {touched.name && errors.name ? errors.name : null}
            </p>
          </CFormGroup>
          <CFormGroup>
            <CLabel>Topic</CLabel>
            <Field
              type="text"
              className="form-control"
              name="topic"
              placeholder="Enter a topic"
            />
            <p className="text-danger">{touched.topic && errors.topic}</p>
          </CFormGroup>
          <CFormGroup>
            <CLabel>Level</CLabel>
            <Field
              type="text"
              className="form-control"
              name="level"
              placeholder="Specify level"
            />
            <p className="text-danger">{touched.level && errors.level}</p>
          </CFormGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Vocabularies;

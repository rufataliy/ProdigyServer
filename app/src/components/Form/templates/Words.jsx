import React from "react";
import { Field } from "formik";
import { CFormGroup, CContainer, CRow, CCol, CLabel } from "@coreui/react";

const Words = ({ errors, touched }) => {
  return (
    <CContainer>
      <CRow>
        <CCol bsPrefix={"col-12"}>
          <CFormGroup>
            <CLabel>Phrase</CLabel>
            <Field
              type="text"
              className="form-control"
              name="phrase"
              placeholder="Enter the phrase"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Definition</CLabel>
            <Field
              type="text"
              className="form-control"
              name="definition"
              placeholder="Enter the definition"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Example</CLabel>
            <Field
              type="text"
              className="form-control"
              name="example"
              placeholder="Enter an example"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Topic</CLabel>
            <Field
              type="text"
              className="form-control"
              name="topic"
              placeholder="Enter a topic"
            />
          </CFormGroup>
          <CFormGroup>
            <CLabel>Source</CLabel>
            <Field
              type="text"
              className="form-control"
              name="source"
              placeholder="Enter a source"
            />
          </CFormGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Words;

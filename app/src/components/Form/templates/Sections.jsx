import React, { Suspense } from "react";
import { Field } from "formik";
import {
  CFormGroup,
  CContainer,
  CInput,
  CRow,
  CCol,
  CLabel,
} from "@coreui/react";
import capitalize from "../../../utils/capitalize";
import Loading from "../../../views/_Loading.jsx";

const sectionTypes = ["grammar", "reading", "writing", "speaking", "listening"];

const TextEditor = React.lazy(() => import("../TextEditor.jsx"));

const Sections = ({ touched, errors }) => {
  return (
    <CContainer>
      <CRow>
        <CCol className={"p-0 col-12"}>
          <CLabel>Title</CLabel>
          <CFormGroup>
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
          <CFormGroup>
            <CLabel>Group Type</CLabel>
            <CCol>
              {sectionTypes.map((type, index) => (
                <Field name="sectionType">
                  {({ field, form }) => (
                    <div
                      key={field.value + index}
                      className="radio w-100 flex-grow-1 form-check"
                    >
                      <CInput
                        {...field}
                        checked={field.value === type}
                        hidden
                        className="radio w-100 flex-grow-1"
                        type="radio"
                        label={capitalize(type)}
                        value={type}
                        id={`groupType-${index + 1}`}
                      />
                      <CLabel htmlFor={`groupType-${index + 1}`}>
                        {capitalize(type)}
                      </CLabel>
                    </div>
                  )}
                </Field>
              ))}
            </CCol>
          </CFormGroup>
          <CFormGroup>
            <CLabel>Content</CLabel>
            <Field name="text">
              {({ field, form }) => (
                <Suspense fallback={<Loading />}>
                  <TextEditor
                    form={form}
                    onChange={field.onChange}
                    initialText={form.initialValues.text}
                  />
                </Suspense>
              )}
            </Field>
          </CFormGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Sections;

import React from "react";
import { Field, FieldArray } from "formik";
import { DatePicker } from "../DatePicker.jsx";
import { TimePicker } from "../TimePicker.jsx";
import AddStudent from "../addStudent.jsx";
import AddToList from "../AddToList.jsx";
import {
  CFormGroup,
  CInput,
  CLabel,
  CContainer,
  CRow,
  CCol,
} from "@coreui/react";

const daysOptions = [
  { label: "Sunday", value: "0" },
  { label: "Monday", value: "1" },
  { label: "Tuesday", value: "2" },
  { label: "Wednesday", value: "3" },
  { label: "Thursday", value: "4" },
  { label: "Friday", value: "5" },
  { label: "Saturday", value: "6" },
];

const Klasses = ({ isAuthor }) => {
  return (
    <CContainer>
      <CRow>
        <CCol className={"p-0 col-12 col-lg-7"}>
          <CContainer>
            <CRow className={"row mb-5"}>
              <CCol
                className={"col-7 d-flex flex-column justify-content-between"}
              >
                <CFormGroup className="flex-grow-1 d-flex flex-column">
                  <CLabel>Title</CLabel>
                  <Field
                    disabled={!isAuthor}
                    className="form-control"
                    name="title"
                    placeholder="enter class title"
                  />
                </CFormGroup>
                <CFormGroup className="flex-grow-1 d-flex flex-column">
                  <CLabel>Level</CLabel>
                  <Field
                    disabled={!isAuthor}
                    className="form-control"
                    placeholder="enter class level"
                    name="level"
                  />
                </CFormGroup>
                <CFormGroup className="flex-grow-1 d-flex flex-column mb-0">
                  <CLabel>Origin</CLabel>
                  <Field
                    disabled={!isAuthor}
                    className="form-control"
                    name="origin"
                    placeholder="enter the origin"
                  />
                </CFormGroup>
              </CCol>
              <CCol xs={5} md={4}>
                <CFormGroup>
                  <Field>
                    {({ field, form }) => {
                      const onChange = (value) => {
                        const { daysOfWeek } = form.values;
                        if (daysOfWeek.indexOf(value) >= 0) {
                          daysOfWeek.splice(daysOfWeek.indexOf(value), 1);
                        } else {
                          daysOfWeek.push(value);
                        }
                        form.setFieldValue(
                          "daysOfWeek",
                          form.values.daysOfWeek
                        );
                      };
                      return daysOptions.map((day, index) => {
                        return (
                          <div
                            key={day + index}
                            className="radio w-100 flex-grow-1 form-check"
                          >
                            <CInput
                              hidden
                              disabled={!isAuthor}
                              {...field}
                              checked={
                                field.value.daysOfWeek &&
                                field.value.daysOfWeek.indexOf(day.value) >= 0
                                  ? true
                                  : false
                              }
                              className="radio w-100 flex-grow-1 form-check-input"
                              onChange={() => onChange(day.value)}
                              type="checkbox"
                              id={`daysOfWeek-${day.value}`}
                              value={day.value}
                            />
                            <CLabel
                              className="form-check-label"
                              htmlFor={`daysOfWeek-${day.value}`}
                            >
                              {day.label}
                            </CLabel>
                          </div>
                        );
                      });
                    }}
                  </Field>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow className={"row mb-5"}>
              <CCol md={4} xs={6}>
                <CFormGroup className="flex-grow-1">
                  <CLabel>Start date</CLabel>
                  <Field disabled={true} name="start">
                    {({ form }) => {
                      return (
                        <DatePicker
                          fieldName="start"
                          readOnly={!isAuthor}
                          initialDate={form.initialValues.start}
                          setFieldValue={form.setFieldValue}
                        />
                      );
                    }}
                  </Field>
                </CFormGroup>
                <CFormGroup className="flex-grow-1">
                  <CLabel>End date</CLabel>
                  <Field name="end">
                    {({ form }) => {
                      return (
                        <DatePicker
                          fieldName="end"
                          readOnly={!isAuthor}
                          initialDate={form.initialValues.end}
                          setFieldValue={form.setFieldValue}
                        />
                      );
                    }}
                  </Field>
                </CFormGroup>
              </CCol>
              <CCol md={3} xs={6}>
                <CFormGroup className="flex-grow-1">
                  <CLabel>Start time</CLabel>
                  <Field>
                    {({ field, form }) => {
                      return (
                        <TimePicker
                          fieldName="start"
                          recurrField="startTime"
                          readOnly={!isAuthor}
                          setFieldValue={form.setFieldValue}
                          initialValue={form.initialValues.start}
                        />
                      );
                    }}
                  </Field>
                </CFormGroup>
                <CFormGroup className="flex-grow-1">
                  <CLabel>End time</CLabel>
                  <Field>
                    {({ field, form, meta }) => {
                      return (
                        <TimePicker
                          readOnly={!isAuthor}
                          fieldName="end"
                          recurrField="endTime"
                          setFieldValue={form.setFieldValue}
                          initialValue={form.initialValues.end}
                        />
                      );
                    }}
                  </Field>
                </CFormGroup>
              </CCol>
              <CCol md={4} xs={12}>
                <div className="d-flex h-100 flex-column justify-content-between">
                  <CLabel>Group Type</CLabel>
                  <CFormGroup className="flex-grow-1 radio">
                    <Field name="classType">
                      {({ field, form }) => (
                        <CInput
                          hidden
                          disabled={!isAuthor}
                          {...field}
                          checked={field.value === "individual"}
                          className="radio w-100 flex-grow-1 form-check"
                          type="radio"
                          value="individual"
                          id="groupType-1"
                        />
                      )}
                    </Field>
                    <CLabel htmlFor="groupType-1" className="form-check-label">
                      individual
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup className="flex-grow-1 radio">
                    <CLabel className="form-label border-0"></CLabel>
                    <Field name="classType">
                      {({ field, form }) => (
                        <CInput
                          {...field}
                          disabled={!isAuthor}
                          hidden
                          className="radio w-100 flex-grow-1 form-check"
                          type="radio"
                          value="group"
                          id="groupType-2"
                        />
                      )}
                    </Field>
                    <CLabel htmlFor="groupType-2" className="form-check-label">
                      Group
                    </CLabel>
                  </CFormGroup>
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </CCol>
        <CCol
          className={
            "p-0 col-12 col-lg-5 d-flex flex-column justify-content-between schedule-form-third"
          }
        >
          <FieldArray name="studentList">
            {({ push, remove, form }) => {
              return (
                <Field>
                  {({ field }) => (
                    <AddStudent
                      readOnly={!isAuthor}
                      initialStudentList={form.initialValues.studentList}
                      remove={remove}
                      push={push}
                    />
                  )}
                </Field>
              );
            }}
          </FieldArray>
          <FieldArray name="programList">
            {({ push, remove, form }) => {
              return (
                <AddToList
                  readOnly={!isAuthor}
                  push={push}
                  remove={remove}
                  setFieldValue={form.setFieldValue}
                  collectionName="programs"
                  values={form.values}
                  removedListField="removedProgramsList"
                  initialList={form.initialValues.programList}
                  label="Assign program"
                />
              );
            }}
          </FieldArray>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Klasses;

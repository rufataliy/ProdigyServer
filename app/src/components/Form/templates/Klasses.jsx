import React from "react";
import { Field, FieldArray } from "formik";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import { DatePicker } from "../DatePicker.jsx";
import { TimePicker } from "../TimePicker.jsx";
import AddStudent from "../addStudent.jsx";
import AddToList from "../AddToList.jsx";

const daysOptions = [
  { label: "Sunday", value: "0" },
  { label: "Monday", value: "1" },
  { label: "Tuesday", value: "2" },
  { label: "Wednesday", value: "3" },
  { label: "Thursday", value: "4" },
  { label: "Friday", value: "5" },
  { label: "Saturday", value: "6" },
];

const Klasses = (props) => {
  return (
    <Container>
      <Row>
        <Col bsPrefix={"p-0 col-12 col-lg-7"}>
          <Row>
            <Col xs={7}>
              <Form.Group>
                <Field
                  className="form-control"
                  name="title"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group>
                <Field
                  className="form-control"
                  placeholder="level"
                  name="level"
                />
              </Form.Group>
              <Form.Group>
                <Field
                  className="form-control"
                  name="origin"
                  placeholder="Origin"
                />
              </Form.Group>
            </Col>
            <Col xs={5} md={4}>
              <Form.Group>
                <Field>
                  {({ field, form }) => {
                    const onChange = (value) => {
                      const { daysOfWeek } = form.values;
                      if (daysOfWeek.indexOf(value) >= 0) {
                        daysOfWeek.splice(daysOfWeek.indexOf(value), 1);
                      } else {
                        daysOfWeek.push(value);
                      }
                      form.setFieldValue("daysOfWeek", form.values.daysOfWeek);
                    };
                    return daysOptions.map((day) => {
                      return (
                        <Form.Check
                          hidden
                          {...field}
                          checked={
                            field.value.daysOfWeek &&
                            field.value.daysOfWeek.indexOf(day.value) >= 0
                              ? true
                              : false
                          }
                          key={day.value}
                          className="radio w-100 flex-grow-1"
                          onChange={() => onChange(day.value)}
                          type="checkbox"
                          id={`daysOfWeek-${day.value}`}
                          label={day.label}
                          value={day.value}
                        />
                      );
                    });
                  }}
                </Field>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4} xs={6}>
              <Form.Group className="flex-grow-1">
                <Form.Label>Start date</Form.Label>
                <Field name="start">
                  {({ form }) => {
                    return (
                      <DatePicker
                        fieldName="start"
                        initialDate={form.initialValues.start}
                        setFieldValue={form.setFieldValue}
                      />
                    );
                  }}
                </Field>
              </Form.Group>
              <Form.Group className="flex-grow-1">
                <Form.Label>End date</Form.Label>
                <Field name="end">
                  {({ form }) => {
                    return (
                      <DatePicker
                        fieldName="end"
                        initialDate={form.initialValues.end}
                        setFieldValue={form.setFieldValue}
                      />
                    );
                  }}
                </Field>
              </Form.Group>
            </Col>
            <Col md={3} xs={6}>
              <Form.Group className="flex-grow-1">
                <Form.Label>Start time</Form.Label>
                <Field>
                  {({ field, form }) => {
                    return (
                      <TimePicker
                        fieldName="start"
                        recurrField="startTime"
                        pathValueToFormik={form.setFieldValue}
                        initialTime={field.value.start}
                      />
                    );
                  }}
                </Field>
              </Form.Group>
              <Form.Group className="flex-grow-1">
                <Form.Label>End time</Form.Label>
                <Field>
                  {({ field, form, meta }) => {
                    return (
                      <TimePicker
                        fieldName="end"
                        recurrField="endTime"
                        pathValueToFormik={form.setFieldValue}
                        initialTime={field.value.end}
                      />
                    );
                  }}
                </Field>
              </Form.Group>
            </Col>
            <Col md={4} xs={12}>
              <div className="d-flex h-100 flex-column justify-content-between">
                <Form.Group className="flex-grow-1">
                  <Form.Label>Group Type</Form.Label>
                  <Field name="classType">
                    {({ field, form }) => (
                      <Form.Check
                        hidden
                        {...field}
                        checked={field.value === "individual"}
                        className="radio w-100 flex-grow-1"
                        type="radio"
                        label="Individual"
                        value="individual"
                        id="groupType-1"
                      />
                    )}
                  </Field>
                </Form.Group>
                <Form.Group>
                  <Form.Label> </Form.Label>
                  <Field name="classType">
                    {({ field, form }) => (
                      <Form.Check
                        {...field}
                        checked={field.value === "group"}
                        hidden
                        className="radio w-100 flex-grow-1"
                        type="radio"
                        label="Group"
                        value="group"
                        id="groupType-2"
                      />
                    )}
                  </Field>
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          bsPrefix={
            "p-0 col-12 col-lg-5 d-flex flex-column justify-content-between"
          }
        >
          <FieldArray name="studentList">
            {({ push, remove, form }) => {
              return (
                <Field className="flex-grow-1">
                  {({ field }) => (
                    <AddStudent
                      initialStudentList={form.initialValues.studentList}
                      remove={remove}
                      push={push}
                    />
                  )}
                </Field>
              );
            }}
          </FieldArray>
          <FieldArray className="flex-grow-1" name="programList">
            {({ push, remove, form }) => {
              return (
                <AddToList
                  push={push}
                  remove={remove}
                  collectionName="programs"
                  form={form}
                  removedListField="removedProgramsList"
                  initialList={form.initialValues.programList}
                />
              );
            }}
          </FieldArray>
        </Col>
      </Row>
    </Container>
  );
};

export default Klasses;

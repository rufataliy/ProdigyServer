import React from "react";
import api from "../api/api";
import { Form, Button } from "react-bootstrap";
import { Field, FieldArray } from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Input,
  Radio,
  SubmitButton,
  DatePicker,
  TimePicker,
  Checkbox
} from "formik-antd";

export const newClassForm = (() => {
  const fields = props => {
    console.log(props);
    const daysOptions = [
      { label: "Sunday", value: "0" },
      { label: "Monday", value: "1" },
      { label: "Tuesday", value: "2" },
      { label: "Wednesday", value: "3" },
      { label: "Thursday", value: "4" },
      { label: "Friday", value: "5" },
      { label: "Saturday", value: "6" }
    ];

    const field = {
      newClass: (
        <React.Fragment>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Field className="form-control" name="title" placeholder="Title" />
          </Form.Group>
          <Form.Group>
            <Field>
              {({ field, form }) => {
                console.log(form);

                const onChange = value => {
                  const { daysOfWeek } = form.values;
                  if (daysOfWeek.indexOf(value) >= 0) {
                    daysOfWeek.splice(daysOfWeek.indexOf(value), 1);
                  } else {
                    daysOfWeek.push(value);
                  }
                  form.setFieldValue("daysOfWeek", form.values.daysOfWeek);
                };
                return daysOptions.map(day => {
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
          <div className="d-flex justify-content-between">
            <Form.Group className="flex-grow-1">
              <Form.Label>Start Date</Form.Label>
              <div>
                <DatePicker name="start" />
              </div>
            </Form.Group>
            <Form.Group className="flex-grow-1">
              <Form.Label>End Date</Form.Label>
              <div>
                <DatePicker name="end" />
              </div>
            </Form.Group>
          </div>
          <div className="d-flex justify-content-between">
            <Form.Group className="flex-grow-1">
              <Form.Label>Start time</Form.Label>
              <div>
                <TimePicker name="startTime" />
              </div>
            </Form.Group>
            <Form.Group className="flex-grow-1">
              <Form.Label>End time</Form.Label>
              <div>
                <TimePicker name="endTime" />
              </div>
            </Form.Group>
          </div>
          <Form.Group>
            <Form.Label>Level</Form.Label>
            <Field className="form-control" name="level" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Group Type</Form.Label>
            <Container fluid>
              <Row>
                <Col>
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
                </Col>
                <Col>
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
                </Col>
              </Row>
            </Container>
          </Form.Group>
          <Form.Group>
            <Form.Label>Origin</Form.Label>
            <Field
              className="form-control"
              name="origin"
              placeholder="Origin"
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" type="primary">
              {props.method != "put" ? "Save" : "Update"}
            </Button>
            {props.method == "put" && (
              <Button
                onClick={props.handleDelete}
                className="btn-danger"
                type="danger"
              >
                Delete
              </Button>
            )}
          </Form.Group>
        </React.Fragment>
      ),
      newWord: (
        <React.Fragment>
          <Input type="text" name="phrase" placeholder="Phrase" />
          <Input type="text" name="definition" placeholder="Definition" />
          <Input type="text" name="example" placeholder="Example" />
          <Input type="text" name="topic" placeholder="Topic" />
          <Input type="text" name="source" placeholder="Source" />
          <SubmitButton>Save</SubmitButton>
        </React.Fragment>
      ),
      newVocabulary: (
        <React.Fragment>
          <Input type="text" name="name" placeholder="Name" />
          <Input type="text" name="topic" placeholder="Topic" />
          <Input type="text" name="level" placeholder="Level" />
          <SubmitButton>Save</SubmitButton>
        </React.Fragment>
      )
    };
    return field[props.formType];
  };
  //
  const dbPath = {
    post: (props, submitValues) => {
      return api(props, submitValues);
    },
    put: (props, submitValues) => {
      return api(props, submitValues);
    },
    delete: props => {
      return api(props);
    },
    get: props => {
      return api(props);
    }
  };
  return {
    fields: fields,
    dbPath: dbPath
  };
})();

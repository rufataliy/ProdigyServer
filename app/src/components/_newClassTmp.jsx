import React from "react";
import api from "../api/api";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Field, FieldArray } from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddStudent from "./addStudent.jsx";
import AssignTo from "./AssignTo.jsx";
import { DatePicker } from "./DatePicker.jsx";
import { TimePicker } from "./TimePicker.jsx";
export const newClassForm = (() => {
  const fields = (props, handleDelete) => {
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
      klasses: (
        <React.Fragment>
          <Container>
            <Row>
              <Col bsPrefix={"p-0 col-7"}>
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
                  <Col xs={4}>
                    <Form.Group>
                      <Field>
                        {({ field, form }) => {
                          const onChange = value => {
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
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Label>Group Type</Form.Label>
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
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Field>
                      {({ field, form, meta }) => {
                        return (
                          <DatePicker
                            start={field.value.start}
                            end={field.value.end}
                            pathValueToFormik={form.setFieldValue}
                          />
                        );
                      }}
                    </Field>
                  </Col>
                  <Col xs={3}>
                    <Form.Group className="flex-grow-1">
                      <Form.Label>Start time</Form.Label>
                      <Field>
                        {({ field, form, meta }) => {
                          return (
                            <TimePicker
                              className
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
                </Row>
              </Col>
              <Col bsPrefix={"p-0 col-5"}>
                <Col xs={12}>
                  <FormGroup>
                    <FieldArray name="studentList">
                      {({ push, remove }) => {
                        return (
                          <Field>
                            {({ field }) => (
                              <AddStudent
                                initialStudentList={field.value.studentList}
                                remove={remove}
                                push={push}
                              />
                            )}
                          </Field>
                        );
                      }}
                    </FieldArray>
                  </FormGroup>
                  <Form.Group>
                    <Button type="submit" className="btn-sm" type="primary">
                      {props.method != "put" ? "Save" : "Update"}
                    </Button>
                    {props.method == "put" && (
                      <Button
                        onClick={handleDelete}
                        className="btn-danger btn-sm"
                        type="danger"
                      >
                        Delete
                      </Button>
                    )}
                  </Form.Group>
                </Col>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      ),
      words: (
        <React.Fragment>
          <Field type="text" name="phrase" placeholder="Phrase" />
          <Field type="text" name="definition" placeholder="Definition" />
          <Field type="text" name="example" placeholder="Example" />
          <Field type="text" name="topic" placeholder="Topic" />
          <Field type="text" name="source" placeholder="Source" />
          <Button type="submit" className="btn-sm" type="primary">
            {props.method != "put" ? "Save" : "Update"}
          </Button>
          {props.method == "put" && (
            <Button
              onClick={handleDelete}
              className="btn-danger btn-sm"
              type="danger"
            >
              Delete
            </Button>
          )}
        </React.Fragment>
      ),
      vocabularies: (
        <React.Fragment>
          <Container>
            <Row>
              <Col bsPrefix={"p-0 col-12"}>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="topic"
                    placeholder="Topic"
                  />
                </Form.Group>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="level"
                    placeholder="Level"
                  />
                </Form.Group>
              </Col>
              <Col bsPrefix={"p-0 col-12"}>
                <Col xs={12} bsPrefix={"p-0"}>
                  <FieldArray name="klassList">
                    {({ push, remove }) => {
                      return (
                        <Field>
                          {({ field }) => (
                            <AssignTo
                              push={push}
                              remove={remove}
                              initialKlassList={field.value.klassList}
                            />
                          )}
                        </Field>
                      );
                    }}
                  </FieldArray>
                </Col>
              </Col>
              <Button type="submit" className="btn-sm btn-block" type="primary">
                {props.method != "put" ? "Save" : "Update"}
              </Button>
              {props.method == "put" && (
                <Button
                  onClick={handleDelete}
                  className="btn-danger btn-sm"
                  type="danger"
                >
                  Delete
                </Button>
              )}
            </Row>
          </Container>
        </React.Fragment>
      ),
      "vocabularies/assignTo": (
        <React.Fragment>
          <Field>
            {({ field, form, meta }) => {
              return <AssignTo initialKlassList={field.value.klassList} />;
            }}
          </Field>
          )}
        </React.Fragment>
      )
    };
    return field[props.collectionName];
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

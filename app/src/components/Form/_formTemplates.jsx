import React from "react";
import api from "../../api/api";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Field, FieldArray } from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddStudent from "./addStudent.jsx";
import AssignTo from "./AssignTo.jsx";
import { DatePicker } from "./DatePicker.jsx";
import { TimePicker } from "./TimePicker.jsx";
import AddToList from "./AddToList.jsx";
import TextEditor from "./TextEditor.jsx";
export const _formTemplates = (() => {
  const fields = (props, handleDelete) => {
    const { formConfig, errors, touched } = props;

    const daysOptions = [
      { label: "Sunday", value: "0" },
      { label: "Monday", value: "1" },
      { label: "Tuesday", value: "2" },
      { label: "Wednesday", value: "3" },
      { label: "Thursday", value: "4" },
      { label: "Friday", value: "5" },
      { label: "Saturday", value: "6" },
    ];
    const field = {
      klasses: (
        <React.Fragment>
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
                            form.setFieldValue(
                              "daysOfWeek",
                              form.values.daysOfWeek
                            );
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
                  <Col md={3} xs={6}>
                    <Form.Group className="flex-grow-1">
                      <Form.Label>Start time</Form.Label>
                      <Field>
                        {({ field, form, meta }) => {
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
                </Row>
              </Col>
              <Col bsPrefix={"p-0 col-12 col-lg-5"}>
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
                      {formConfig.method != "put" ? "Save" : "Update"}
                    </Button>
                    {formConfig.method == "put" && (
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
          <Form.Group>
            <Field
              type="text"
              className="form-control"
              name="phrase"
              placeholder="Phrase"
            />
          </Form.Group>
          <Form.Group>
            <Field
              type="text"
              className="form-control"
              name="definition"
              placeholder="Definition"
            />
          </Form.Group>
          <Form.Group>
            <Field
              type="text"
              className="form-control"
              name="example"
              placeholder="Example"
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
              name="source"
              placeholder="Source"
            />
          </Form.Group>
          <Button type="submit" className="btn-sm" type="primary">
            {formConfig.method != "put" ? "Save" : "Update"}
          </Button>
          {formConfig.method == "put" && (
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
              <Col bsPrefix={"col-12 col-md-6"}>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                  />
                  <p className="text-danger">
                    {touched.name && errors.name ? errors.name : null}
                  </p>
                </Form.Group>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="topic"
                    placeholder="Topic"
                  />
                  <p className="text-danger">{touched.topic && errors.topic}</p>
                </Form.Group>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="level"
                    placeholder="Level"
                  />
                  <p className="text-danger">{touched.level && errors.level}</p>
                </Form.Group>
              </Col>
              <Col bsPrefix={"col-12 col-md-6"}>
                <Col xs={12} bsPrefix={"p-0"}>
                  <FieldArray name="klassList">
                    {({ push, remove }) => {
                      return (
                        <Field>
                          {({ field }) => (
                            <AddToList
                              push={push}
                              remove={remove}
                              collectionName="klasses"
                              initialList={field.value.klassList}
                            />
                          )}
                        </Field>
                      );
                    }}
                  </FieldArray>
                </Col>
              </Col>
              <Button type="submit" className="btn-sm btn-block" type="primary">
                {formConfig.method != "put" ? "Save" : "Update"}
              </Button>
              {formConfig.method == "put" && (
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
      ),
      programs: (
        <React.Fragment>
          <Container>
            <Row>
              <Col bsPrefix={"col-12 col-md-6"}>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title"
                  />
                  <p className="text-danger">
                    {touched.title && errors.title ? errors.title : null}
                  </p>
                </Form.Group>
              </Col>
              <Col bsPrefix={"col-12 col-md-6"}>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Description"
                  />
                  <p className="text-danger">{touched.level && errors.level}</p>
                </Form.Group>
              </Col>
              <Col bsPrefix={"col-12 col-md-6"}>
                <Col xs={12} bsPrefix={"p-0"}>
                  <FieldArray name="lessonList">
                    {({ push, remove }) => {
                      return (
                        <Field>
                          {({ field }) => (
                            <AddToList
                              push={push}
                              remove={remove}
                              collectionName="lessons"
                              initialList={field.value.lessonList}
                            />
                          )}
                        </Field>
                      );
                    }}
                  </FieldArray>
                </Col>
              </Col>
              <Col bsPrefix={"col-12 col-md-6"}>
                <Col xs={12} bsPrefix={"p-0"}>
                  <FieldArray name="klassList">
                    {({ push, remove }) => {
                      return (
                        <Field>
                          {({ field }) => (
                            <AddToList
                              push={push}
                              remove={remove}
                              collectionName="klasses"
                              initialList={field.value.klassList}
                            />
                          )}
                        </Field>
                      );
                    }}
                  </FieldArray>
                </Col>
              </Col>
              <Button type="submit" className="btn-sm btn-block" type="primary">
                {formConfig.method != "put" ? "Save" : "Update"}
              </Button>
              {formConfig.method == "put" && (
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
      lessons: (
        <React.Fragment>
          <Container>
            <Row>
              <Col bsPrefix={"col-12 col-md-6"}>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title"
                  />
                  <p className="text-danger">
                    {touched.title && errors.title ? errors.title : null}
                  </p>
                </Form.Group>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="level"
                    placeholder="Level"
                  />
                  <p className="text-danger">{touched.level && errors.level}</p>
                </Form.Group>
              </Col>
              <Col bsPrefix={"col-12 col-md-6"}>
                <Col xs={12} bsPrefix={"p-0"}>
                  <FieldArray name="sectionList">
                    {({ push, remove }) => {
                      return (
                        <Field>
                          {({ field }) => (
                            <AddToList
                              push={push}
                              remove={remove}
                              collectionName="sections"
                              initialList={field.value.sectionList}
                            />
                          )}
                        </Field>
                      );
                    }}
                  </FieldArray>
                </Col>
              </Col>
              <Button type="submit" className="btn-sm btn-block" type="primary">
                {formConfig.method != "put" ? "Save" : "Update"}
              </Button>
              {formConfig.method == "put" && (
                <Button
                  onClick={handleDelete}
                  className="btn-danger btn-sm"
                  type="danger"
                  value="Delete"
                />
              )}
            </Row>
          </Container>
        </React.Fragment>
      ),
      sections: (
        <React.Fragment>
          <Container>
            <Row>
              <Col bsPrefix={"p-0 col-12"}>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title"
                  />
                  <p className="text-danger">
                    {touched.title && errors.title ? errors.title : null}
                  </p>
                </Form.Group>
                <Form.Group>
                  <Field
                    type="text"
                    className="form-control"
                    name="level"
                    placeholder="Level"
                  />
                  <p className="text-danger">{touched.level && errors.level}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Group Type</Form.Label>
                  <Col>
                    <Field name="sectionType">
                      {({ field, form }) => (
                        <Form.Check
                          {...field}
                          checked={field.value === "grammar"}
                          hidden
                          className="radio w-100 flex-grow-1"
                          type="radio"
                          label="Grammer"
                          value="grammar"
                          id="groupType-4"
                        />
                      )}
                    </Field>
                    <Field name="sectionType">
                      {({ field, form }) => (
                        <Form.Check
                          hidden
                          {...field}
                          checked={field.value === "reading"}
                          className="radio w-100 flex-grow-1"
                          type="radio"
                          label="Reading"
                          value="reading"
                          id="groupType-1"
                        />
                      )}
                    </Field>
                    <Field name="sectionType">
                      {({ field, form }) => (
                        <Form.Check
                          {...field}
                          checked={field.value === "writing"}
                          hidden
                          className="radio w-100 flex-grow-1"
                          type="radio"
                          label="Writing"
                          value="writing"
                          id="groupType-2"
                        />
                      )}
                    </Field>
                    <Field name="sectionType">
                      {({ field, form }) => (
                        <Form.Check
                          {...field}
                          checked={field.value === "speaking"}
                          hidden
                          className="radio w-100 flex-grow-1"
                          type="radio"
                          label="Speaking"
                          value="speaking"
                          id="groupType-3"
                        />
                      )}
                    </Field>
                    <Field name="sectionType">
                      {({ field, form }) => (
                        <Form.Check
                          {...field}
                          checked={field.value === "listening"}
                          hidden
                          className="radio w-100 flex-grow-1"
                          type="radio"
                          label="Listening"
                          value="listening"
                          id="groupType-4"
                        />
                      )}
                    </Field>
                  </Col>
                </Form.Group>
                <FormGroup>
                  <Field name="text">
                    {({ field, form }) => (
                      <TextEditor
                        form={form}
                        onChange={field.onChange}
                        initialText={form.initialValues.text}
                      />
                    )}
                  </Field>
                </FormGroup>
              </Col>

              <Button type="submit" className="btn-sm btn-block" type="primary">
                {formConfig.method != "put" ? "Save" : "Update"}
              </Button>
              {formConfig.method == "put" && (
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
      newChat: (
        <React.Fragment>
          <Field type="text" name="phrase" placeholder="Phrase" />
          <FieldArray name="participants">
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
        </React.Fragment>
      ),
    };
    return field[formConfig.collectionName];
  };
  //
  const dbPath = {
    post: (props, submitValues) => {
      return api(props, submitValues);
    },
    put: (props, submitValues) => {
      return api(props, submitValues);
    },
    delete: (props) => {
      return api(props);
    },
    get: (props) => {
      return api(props);
    },
  };
  return {
    fields: fields,
    dbPath: dbPath,
  };
})();

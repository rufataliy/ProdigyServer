import React from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { Field, FieldArray } from "formik";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddStudent from "./addStudent.jsx";
import AddToList from "./AddToList.jsx";
import TextEditor from "./TextEditor.jsx";
import Klasses from "./templates/Klasses.jsx";
import Lessons from "./templates/Lessons.jsx";
import Sections from "./templates/Sections.jsx";

export const _formTemplates = (() => {
  const fields = (props) => {
    const {
      formConfig: { method, collectionName },
      errors,
      touched,
    } = props;

    const field = {
      klasses: <Klasses {...props} />,
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
          <Button type="submit" className="btn-sm btn-block" type="primary">
            {method != "put" ? "Save" : "Update"}
          </Button>
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
                    name="title"
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
              <Button type="submit" className="btn-sm btn-block" type="primary">
                {method != "put" ? "Save" : "Update"}
              </Button>
            </Row>
          </Container>
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
                </Col>
              </Col>
              <Button type="submit" className="btn-sm btn-block" type="primary">
                {method != "put" ? "Save" : "Update"}
              </Button>
            </Row>
          </Container>
        </React.Fragment>
      ),
      lessons: <Lessons {...props} />,
      sections: <Sections {...props} />,
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
    return field[collectionName];
  };
  return {
    fields: fields,
  };
})();

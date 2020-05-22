import React from "react";
import { Field, FieldArray } from "formik";
import { Container, Form, Row, Col } from "react-bootstrap";
import AddToList from "../AddToList.jsx";

const Programs = ({ errors, touched }) => {
  return (
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
      </Row>
    </Container>
  );
};

export default Programs;

import React from "react";
import { Field, FieldArray } from "formik";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import AddToList from "../AddToList.jsx";

const Lessons = ({ errors, touched }) => {
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
              {({
                push,
                remove,
                form: { values, initialValues, setFieldValue },
              }) => {
                return (
                  <Field>
                    {({ field }) => (
                      <AddToList
                        values={values}
                        setFieldValue={setFieldValue}
                        push={push}
                        remove={remove}
                        collectionName="sections"
                        initialList={initialValues.sectionList}
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

export default Lessons;

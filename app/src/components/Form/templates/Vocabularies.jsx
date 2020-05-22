import React from "react";
import { Field, FieldArray } from "formik";
import { Container, Form, Row, Col } from "react-bootstrap";
import AddToList from "../AddToList.jsx";

const Vocabularies = ({ errors, touched }) => {
  return (
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
      </Row>
    </Container>
  );
};

export default Vocabularies;

import React from "react";
import { Field } from "formik";
import { Container, Form, Row, Col } from "react-bootstrap";

const Words = ({ errors, touched }) => {
  return (
    <Container>
      <Row>
        <Col bsPrefix={"col-12"}>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Words;

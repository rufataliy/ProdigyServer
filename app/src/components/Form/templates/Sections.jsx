import React from "react";
import { Field } from "formik";
import { Container, Form, Row, Col } from "react-bootstrap";
import TextEditor from "../TextEditor.jsx";

const Sections = ({ touched, errors }) => {
  return (
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
          <Form.Group>
            <Field name="text">
              {({ field, form }) => (
                <TextEditor
                  form={form}
                  onChange={field.onChange}
                  initialText={form.initialValues.text}
                />
              )}
            </Field>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default Sections;

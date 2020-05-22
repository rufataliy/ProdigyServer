import React from "react";
import { Field, FieldArray } from "formik";
import { Container, Form, Row, Col } from "react-bootstrap";
import AddToList from "../AddToList.jsx";

const Chats = ({ errors, touched }) => {
  return (
    <>
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
    </>
  );
};

export default Chats;

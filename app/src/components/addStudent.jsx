import React, { useEffect, useState, useContext } from "react";
import { newClassForm } from "./_newClassTmp.jsx";
import Context from "../store/context";
import { FieldArray, Field, Form } from "formik";

const AddStudent = props => {
  const [students, setStudents] = useState([]);
  const [state, setState] = useState();
  const apiProps = {
    collectionName: "klasses/addStudent",
    method: "get",
    docId: state
  };
  const handleChange = event => {
    setState(event.target.value);
  };

  const getStudent = async () => {
    const student = await newClassForm.dbPath["get"](apiProps);

    props.push(student[0].user_id);
    setStudents(prevState => [...prevState, student[0]]);
    setState("");
  };
  const handleUnshift = event => {
    setStudents(prevState => {
      prevState.splice(event.target.id, 1);
      return [...prevState];
    });
    props.remove(event.target.id);
  };
  return (
    <div>
      <div className="d-flex">
        <input
          value={state}
          className="form-control"
          onChange={handleChange}
          placeholder="Email"
          type="text"
        />
        <button
          className="btn-primary btn-sm"
          type="button"
          onClick={getStudent}
        >
          add
        </button>
      </div>
      <ul className="list-group">
        {students.map((student, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {student.name}
            <span
              id={index}
              onClick={handleUnshift}
              className="badge badge-primary badge-pill"
            >
              remove
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddStudent;

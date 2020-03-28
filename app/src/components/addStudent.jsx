import React, { useEffect, useState, useContext } from "react";
import { StateHandler } from "./StateHandler.jsx";
import Context from "../store/context";
import api from "../api/api.js";
import { Spinner } from "react-bootstrap";
import {
  getStudentListOptions,
  getStudentOptions
} from "../utils/defaultAPIConfig";
const AddStudent = ({ setAction, push, remove, initialStudentList }) => {
  const [students, setStudents] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [fetching, setFetching] = useState(false);
  const { compUpdate } = useContext(Context);
  useEffect(() => {
    if (initialStudentList.length > 0) {
      setFetching(true);
      api({
        ...getStudentListOptions,
        params: initialStudentList.toString()
      }).then(students => {
        setStudents(students);
        setFetching(false);
      });
    }
  }, [compUpdate]);
  const studentListLoading =
    initialStudentList.length > 0 && students.length < 1;
  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const getStudent = () => {
    setFetching(true);
    api({ ...getStudentOptions, params: inputValue }).then(students => {
      setStudents(prevState => [...prevState, students[0]]);
      setInputValue("");
      push(students[0].user_id);
      setFetching(false);
    });
  };
  const handleUnshift = event => {
    // If event.target is passed to splice function it becomes null ????
    const { id } = event.target;

    setStudents(prevState => {
      prevState.splice(id, 1);
      return [...prevState];
    });
    remove(id);
  };
  return (
    <div>
      <div className="d-flex">
        <input
          value={inputValue}
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
          {fetching ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            "add"
          )}
        </button>
      </div>
      <ul className="list-group">
        {studentListLoading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          students.map((student, index) => (
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
          ))
        )}
      </ul>
    </div>
  );
};

export default StateHandler(AddStudent);

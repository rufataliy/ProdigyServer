import React, { useState } from "react";
import api from "../../api/api.js";
import { CSpinner } from "@coreui/react";
import { getStudentOptions } from "../../utils/defaultAPIConfig";
import Icon from "../../views/_Icon.jsx";

const AddStudent = ({ push, remove, initialStudentList, readOnly }) => {
  const [students, setStudents] = useState(initialStudentList);
  const [inputValue, setInputValue] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  const studentListLoading =
    initialStudentList?.length > 0 && students.length < 1;
  const handleChange = (event) => {
    setError("");
    setInputValue(event.target.value);
  };

  const getStudent = () => {
    if (inputValue.trim() !== "") {
      setFetching(true);
      api({
        ...getStudentOptions,
        endpoint: getStudentOptions.endpoint + inputValue,
      }).then((student) => {
        if (student) {
          setStudents((prevState) => [...prevState, student]);
          setInputValue("");
          push(student._id);
        } else if (!students) {
          setError("user is not found");
        }
        setFetching(false);
      });
    } else {
      setError("please enter an email");
    }
  };
  const handleUnshift = (event) => {
    // If event.target is passed to splice function it becomes null ????
    const { id } = event.target;

    setStudents((prevState) => {
      prevState.splice(id, 1);
      return [...prevState];
    });
    remove(id);
  };
  return (
    <div className="add-students">
      {!readOnly && (
        <>
          Add students
          <div>
            <div className="d-flex">
              <input
                id="addStudents"
                value={inputValue}
                className="form-control"
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
              <button
                className="btn-primary btn-sm"
                type="button"
                onClick={getStudent}
              >
                {fetching ? (
                  <CSpinner animation="border" size="sm" variant="secondary" />
                ) : (
                  "add"
                )}
              </button>
            </div>
          </div>
          <p className="text-danger">{error}</p>
        </>
      )}
      <div>
        Students
        <ul className="list-group">
          {studentListLoading ? (
            <CSpinner animation="border" variant="secondary" />
          ) : (
            students.map((student, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {student.name}
                {!readOnly && (
                  <Icon
                    id={index}
                    onClick={handleUnshift}
                    className="fas fa-trash"
                  />
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddStudent;

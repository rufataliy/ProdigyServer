import React, { useEffect, useState, useContext } from "react";
import { newClassForm } from "./_newClassTmp.jsx";
import Context from "../store/context";

const AddStudent = () => {
  const { compUpdate } = useContext(Context);
  const [students, setStudents] = useState([]);
  const props = {
    collectionName: "users",
    method: "get",
    docId: ""
  };
  const handleChange = event => {
    props.docId = event.target.value;
  };

  const getStudent = async () => {
    const student = await newClassForm.dbPath["get"](props);

    setStudents(prevState => [...prevState, student]);
  };
  //   useEffect(() => {
  //     getStudents();
  //   }, [compUpdate]);
  return (
    <ul class="list-group">
      <input onChange={handleChange} type="text" />
      <button onClick={getStudent}>add</button>
      {students.map(student => (
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {student.name}
          <span class="badge badge-primary badge-pill">add</span>
        </li>
      ))}
    </ul>
  );
};

export default AddStudent;

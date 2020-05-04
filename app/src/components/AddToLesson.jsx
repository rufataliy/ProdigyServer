import React, { useEffect, useState, useContext } from "react";
import Context from "../store/context";
import api from "../api/api.js";
import { Spinner } from "react-bootstrap";
import Icon from "../views/_Icon.jsx";
import { getKlass } from "../utils/defaultAPIConfig";
import { _buildApiOptions } from "../utils/defaultAPIConfig";
import capitalize from "../utils/capitalize";

const AssignTo = ({ push, remove, initialList, collectionName }) => {
  const [list, setList] = useState([]);
  const [addedItems, setAddedItems] = useState(initialList);
  const [fetching, setFetching] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const { compUpdate } = useContext(Context);

  useEffect(() => {
    // fetching list of the author
    setFetching(true);
    api(_buildApiOptions({ collectionName, method: "get" })).then((items) => {
      if (items != null) setList(items);
      setFetching(false);
    });
  }, [compUpdate]);

  const handleChange = (event) => {
    setError("");
    const { value: i } = event.target;
    setIndex(i);
    console.log(alreadyAssigned(i));
    if (alreadyAssigned(i) && i !== "") setError("Already assigned");
  };

  const alreadyAssigned = (i) => {
    return i && addedItems.find(({ _id }) => _id == list[i]._id);
  };

  const assign = () => {
    if (index !== "" && error === "") {
      //_id is destructed as itemId
      const { title, _id } = list[index];
      push({ title, _id });
      setAddedItems((prevState) => [...prevState, { title, _id }]);
      setIndex("");
    } else if (error === "") {
      setError("Please choose a section");
    }
  };

  const handleUnshift = (event) => {
    // If event.target is passed to splice function it becomes null ????
    const { id } = event.target;
    setAddedItems((prevState) => {
      prevState.splice(id, 1);
      return [...prevState];
    });
    remove(id);
  };

  return (
    <div>
      <div className="d-flex">
        <select className="w-100 select" onChange={handleChange} value={index}>
          <option value="">Choose a section</option>
          {list &&
            list.map((item, index) => (
              <option key={index} value={index}>
                {item.title}
              </option>
            ))}
        </select>
        <button className="btn-primary btn-sm" type="button" onClick={assign}>
          {fetching ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            "assign"
          )}
        </button>
      </div>
      <p className="text-danger">{error}</p>
      <ul className="list-group list-box">
        {capitalize(collectionName)}
        {addedItems &&
          addedItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.title}
              <Icon
                id={index}
                onClick={handleUnshift}
                className="fas fa-trash"
              ></Icon>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AssignTo;

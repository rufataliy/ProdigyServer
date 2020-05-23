import React, { useEffect, useState, useContext } from "react";
import { StateHandler } from "../StateHandler.jsx";
import Context from "../../store/context";
import api from "../../api/api.js";
import { Spinner } from "react-bootstrap";
import Icon from "../../views/_Icon.jsx";
import { getKlass } from "../../utils/defaultAPIConfig";

const AssignTo = ({ push, remove, initialKlassList }) => {
  const [klasses, setKlasses] = useState([]);
  const [addedKlasses, setAddedKlasses] = useState(initialKlassList);
  const [fetching, setFetching] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const { compUpdate } = useContext(Context);

  useEffect(() => {
    // fetching klasses of the author
    setFetching(true);
    api(getKlass).then((klasses) => {
      if (klasses != null) setKlasses(klasses);
      setFetching(false);
    });
  }, [compUpdate]);

  const handleChange = (event) => {
    setError("");
    const { value: i } = event.target;
    setIndex(i);
    if (alreadyAssigned(i) && i !== "") setError("Already assigned");
  };

  const alreadyAssigned = (i) => {
    return i && addedKlasses.find(({ klassId }) => klassId == klasses[i]._id);
  };

  const assign = () => {
    if (index !== "" && error === "") {
      const { title, _id: klassId } = klasses[index];
      push({ title, klassId });
      setAddedKlasses((prevState) => [...prevState, { title, klassId }]);
      setIndex("");
    } else if (error === "") {
      setError("Please choose a klass");
    }
  };

  const handleUnshift = (event) => {
    // If event.target is passed to splice function it becomes null ????
    const { id } = event.target;
    setAddedKlasses((prevState) => {
      prevState.splice(id, 1);
      return [...prevState];
    });
    remove(id);
    setIndex("");
    setError("");
  };

  return (
    <div>
      <div className="d-flex">
        <select className="w-100 select" onChange={handleChange} value={index}>
          <option value="">Choose a klass</option>
          {klasses &&
            klasses.map((klass, index) => (
              <option key={index} value={index}>
                {klass.title}
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
        Assigned to
        {addedKlasses &&
          addedKlasses.map((klass, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {klass.title}
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

export default StateHandler(AssignTo);

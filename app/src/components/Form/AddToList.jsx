import React, { useEffect, useState, useContext } from "react";
import Context from "../../store/context";
import api from "../../api/api.js";
import { Spinner, Badge } from "react-bootstrap";
import Icon from "../../views/_Icon.jsx";
import { getKlass } from "../../utils/defaultAPIConfig";
import { _buildApiOptions } from "../../utils/defaultAPIConfig";
import capitalize from "../../utils/capitalize";

const AddToList = ({
  form,
  push,
  remove,
  initialList = [],
  collectionName,
}) => {
  const [list, setList] = useState([]);
  const [addedItems, setAddedItems] = useState([...initialList]);
  const [fetching, setFetching] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const { compUpdate } = useContext(Context);
  console.log(initialList);

  useEffect(() => {
    // fetching list of the author
    setFetching(true);
    api(_buildApiOptions({ collectionName, method: "get" })).then((items) => {
      console.log(items);
      items && setList(items);
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
      const { title, _id } = list[index];
      push(_id);
      setAddedItems((prevState) => [...prevState, { title, _id }]);
      setIndex("");
      if (initialList.length > 0) {
        delete form.values.removedProgramsList[_id];
        form.setFieldValue("removedProgramsList", {
          ...form.values.removedProgramsList,
        });
      }
    } else if (error === "") {
      setError("Please choose a section");
    }
  };

  const handleUnshift = (event) => {
    // If event.target is passed to splice function it becomes null ????
    const { id: index } = event.target;
    setAddedItems((prevState) => {
      if (initialList.length > 0) {
        form.setFieldValue("removedProgramsList", {
          ...form.values.removedProgramsList,
          [prevState[index]]: prevState[index],
        });
      }
      prevState.splice(index, 1);
      return [...prevState];
    });
    remove(index);
  };

  return (
    <div>
      <div className="d-flex">
        <select className="w-100 select" onChange={handleChange} value={index}>
          <option value="">Choose {collectionName}</option>
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
      {capitalize(collectionName)}
      <div style={{ height: "200px" }} className="pt-2 pb-2">
        {addedItems &&
          addedItems.map((item, index) => (
            <Badge pill onClick={handleUnshift} variant="primary m-1">
              <h6 style={{ color: "white" }} className="m-0 p-1">
                {item.title}
                <Icon id={index} className="fas fa-trash ml-2" />
              </h6>
            </Badge>
          ))}
      </div>
    </div>
  );
};

export default AddToList;

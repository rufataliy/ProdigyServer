import React, { useEffect, useState, useContext } from "react";
import Context from "../../store/context";
import api from "../../api/api.js";
import { Spinner, Badge } from "react-bootstrap";
import Icon from "../../views/_Icon.jsx";
import { getKlass } from "../../utils/defaultAPIConfig";
import { _buildApiOptions } from "../../utils/defaultAPIConfig";
import capitalize from "../../utils/capitalize";

const AddToList = ({
  values,
  setFieldValue,
  push,
  remove,
  initialList = [],
  collectionName,
  removedListField,
}) => {
  const [list, setList] = useState([]);
  const [addedItems, setAddedItems] = useState([...initialList]);
  const [fetching, setFetching] = useState(false);
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const { compUpdate } = useContext(Context);

  useEffect(() => {
    // fetching list of the author
    setFetching(true);
    api({
      collectionName,
      method: "get",
      endpoint: `/app/${collectionName}`,
    }).then((items) => {
      items && setList(items);
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
    return i && addedItems.find(({ _id }) => _id == list[i]._id);
  };

  const assign = () => {
    if (index !== "" && error === "") {
      const { title, _id } = list[index];
      push(_id);
      setAddedItems((prevState) => [...prevState, { title, _id }]);
      setIndex("");
      if (initialList.length > 0) {
        delete values[removedListField][_id];
        setFieldValue(removedListField, {
          ...values[removedListField],
        });
      }
    } else if (error === "") {
      setError("Please choose a section");
    }
  };

  const handleUnshift = (index) => {
    // If event.target is passed to splice function it becomes null ????
    setAddedItems((prevState) => {
      if (initialList.length > 0) {
        setFieldValue(removedListField, {
          ...values[removedListField],
          [prevState[index]._id]: prevState[index],
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
      <div
        style={{ maxHeight: "200px", overflow: "auto" }}
        className="pt-2 pb-2"
      >
        {addedItems &&
          addedItems.map((item, index) => (
            <Badge
              pill
              onClick={() => handleUnshift(index)}
              variant="primary m-1"
              key={index}
            >
              <h6 style={{ color: "white" }} className="m-0 p-1">
                {item.title}
                <Icon className="fas fa-trash ml-2" />
              </h6>
            </Badge>
          ))}
      </div>
    </div>
  );
};

export default AddToList;

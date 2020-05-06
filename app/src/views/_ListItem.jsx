import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "./_Icon.jsx";
const _Item = ({ item, editItem, path, name }) => {
  return (
    <span className="m-2 quick-access-btn">
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {item.level}
          </Card.Subtitle>
          <Link to={`${path.toLowerCase()}/${item._id}`}>See </Link>
          <Icon onClick={() => editItem(item)} className="ml-3 fas fa-pen" />
          <Icon onClick={() => editItem(item)} className="ml-3 fas fa-trash" />
        </Card.Body>
      </Card>
    </span>
  );
};

export default React.memo(_Item);

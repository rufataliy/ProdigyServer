import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "./_Icon.jsx";

const _Item = ({ item, editItem, deleteItem, readOnly, childRoute }) => {
  return (
    <Card className="mr-3 mt-3" style={{ width: "200px", height: "100px" }}>
      <Card.Body className="d-flex justify-content-between flex-column">
        <div>
          <Card.Title>{item.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {item.level}
          </Card.Subtitle>
        </div>
        <div>
          <Link
            to={{
              pathname: `${item._id}/${childRoute}/`,
              state: {
                extendable: !readOnly,
              },
            }}
          >
            {childRoute}
          </Link>
          {!readOnly && (
            <>
              <Icon
                onClick={() => editItem(item)}
                className="ml-3 fas fa-pen"
              />
              <Icon
                onClick={() => deleteItem(item)}
                className="ml-3 fas fa-trash"
              />
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(_Item);

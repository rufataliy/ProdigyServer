import React from "react";
import { Accordion, Card } from "react-bootstrap";
import Icon from "../../views/_Icon.jsx";

const Word = ({ item, editItem, deleteItem }) => {
  return (
    <Accordion className="m-2">
      <Card style={{ width: "18rem" }}>
        <Accordion.Toggle
          style={{ cursor: "pointer" }}
          as={Card}
          variant="link"
          eventKey={item._id}
        >
          <Card.Header className="d-flex align-items-center justify-content-between">
            {`${item.phrase}`}{" "}
            <div>
              <Icon
                onClick={(e) => {
                  e.stopPropagation();
                  editItem(item);
                }}
                className="ml-3 btn-crud fas fa-pen"
              />
              <Icon
                onClick={(e) => {
                  e.stopPropagation();
                  deleteItem(item);
                }}
                className="ml-3 btn-crud fas fa-trash"
              />
            </div>
          </Card.Header>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={item._id}>
          <Card.Body>
            <p className="text-secondary">Definition</p>
            <p>{item.definition}</p>
            <p className="text-secondary">Example</p>
            <p>{item.example}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};
export default React.memo(Word);

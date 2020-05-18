import React, { useContext, useState } from "react";
import Context from "../store/context";
import { Nav, Spinner } from "react-bootstrap";

export default () => {
  const { author } = useContext(Context);
  const toggleShow = () => setShow(!show);
  return (
    <Nav.Item>
      <h4 className="nav-link">
        {author ? (
          author.name
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
      </h4>
    </Nav.Item>
  );
};

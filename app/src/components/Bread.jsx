import React from "react";
import { useRouteMatch, useLocation, useHistory, Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
const Bread = ({ children, match }) => {
  return (
    <>
      <Breadcrumb>
        {location.pathname.split("/").map((item) => (
          <Link to={item}>{item}</Link>
        ))}
      </Breadcrumb>
      {children}
    </>
  );
};

export default Bread;

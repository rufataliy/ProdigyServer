import React from "react";
import { Button } from "react-bootstrap";
import Icon from "./_Icon.jsx";
export default ({ iconName, onClick, position }) => (
  <Button
    onClick={onClick}
    className={`floating-${position} rounded-btn`}
    variant="outline-primary"
  >
    <Icon className={iconName} />
  </Button>
);

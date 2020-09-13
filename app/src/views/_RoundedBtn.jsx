import React from "react";
import { Button } from "react-bootstrap";
import Icon from "./_Icon.jsx";

export default React.forwardRef(({ iconName, onClick, position }, ref) => {
  return (
    <Button
      ref={ref}
      onClick={onClick}
      className={`floating${position && "-" + position} rounded-btn`}
      variant="outline-primary"
    >
      <Icon className={iconName} />
    </Button>
  );
});

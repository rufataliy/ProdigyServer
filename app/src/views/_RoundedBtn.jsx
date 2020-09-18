import React from "react";
import { CButton } from "@coreui/react";
import Icon from "./_Icon.jsx";

export default React.forwardRef(
  ({ iconName, type, onClick, disabled, position }, ref) => {
    return (
      <CButton
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`floating${position && "-" + position} rounded-btn`}
      >
        <Icon className={iconName} />
      </CButton>
    );
  }
);

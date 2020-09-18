import React from "react";
import { CButton } from "@coreui/react";
import Icon from "./_Icon.jsx";

export default React.forwardRef(({ iconName, onClick, position }, ref) => {
  return (
    <CButton
      ref={ref}
      onClick={onClick}
      className={`floating${position && "-" + position} rounded-btn`}
    >
      <Icon className={iconName} />
    </CButton>
  );
});

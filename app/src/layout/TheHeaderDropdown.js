import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { useAppState } from "../store/useGlobalState";
import Icon from "../views/_Icon.jsx";

const TheHeaderDropdown = () => {
  const [appState] = useAppState();

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={appState.author.picture}
            className="c-avatar-img"
            alt={appState.author.name}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>{appState.author.email}</strong>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem className="d-flex justify-content-center" to="/logout">
          <Icon className="fas fa-sign-out-alt mr-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;

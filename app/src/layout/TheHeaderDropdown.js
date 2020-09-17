import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { logout } from "../icons";
import { useAppState } from "../store/useGlobalState";

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
        <CDropdownItem to="/logout">
          <CIcon content={logout} className="mfe-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;

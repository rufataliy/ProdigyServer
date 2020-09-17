import React, { useState } from "react";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import logo from "../public/img/logo.svg";
import logoMobile from "../public/img/logoMobile.svg";

// sidebar nav config
import navigation from "./_nav";
import { useAppState } from "../store/useGlobalState";

const TheSidebar = () => {
  const [appState, setAppState] = useAppState();

  return (
    <CSidebar
      show={appState.sidebarOpen}
      onShowChange={(val) => setAppState({ ...appState, sidebarOpen: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon className="c-sidebar-brand-full" src={logo} height={35} />
        <CIcon
          className="c-sidebar-brand-minimized"
          src={logoMobile}
          height={25}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);

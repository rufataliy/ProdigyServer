import React from "react";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
} from "@coreui/react";
import breadcrumbRoutes from "./breadcrumbsRoutes";

import { TheHeaderDropdown } from "./index";
import { useAppState } from "../store/useGlobalState";

const TheHeader = () => {
  const [appState, setAppState] = useAppState();

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(appState.sidebarOpen)
      ? false
      : "responsive";
    setAppState({ ...appState, sidebarOpen: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(appState.sidebarOpen)
      ? true
      : "responsive";
    setAppState({ ...appState, sidebarOpen: val });
  };
  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/"></CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>
      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={breadcrumbRoutes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav"></div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;

import React from "react";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
} from "@coreui/react";


import { TheHeaderDropdown } from "./index";
import { useAppState } from "../store/useGlobalState";
import Breadcrumb from './BreadCrumbs';

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

      <CSubheader className="px-3">
        <Breadcrumb/>
        <div className="d-md-down-none mfe-2 c-subheader-nav"></div>
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;

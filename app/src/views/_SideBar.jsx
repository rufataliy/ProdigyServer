import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
const _SideBar = () => {
  const [open, setOpen] = useState(false);
  console.log(open);
  const onClick = () => {
    setOpen(!open);
  };
  return (
    <aside>
      <div className={`sidebarWrapper ${open ? "sideOpen" : ""}`}>
        <div className="sidebar-inner">
          <div
            onClick={onClick}
            className="sideBarButton d-flex justify-content-between rounded"
          >
            <span className="sidebar-line"></span>
            <span className="sidebar-line"></span>
            <span className="sidebar-line"></span>
          </div>
          <Nav className="mr-auto pt-5 flex-column">
            <Link
              className="nav-link btn btn-outline-primary"
              role="button"
              to="/app/Schedule"
            >
              Schedule
            </Link>
            <Link
              className="nav-link btn btn-outline-primary"
              role="button"
              to="/app/Vocabulary"
            >
              Vocabulary
            </Link>
          </Nav>
        </div>
      </div>
    </aside>
  );
};

export default _SideBar;

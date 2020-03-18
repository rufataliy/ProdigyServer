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
            <Nav.Link>
              <Link to="/Schedule">Schedule</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/Vocabulary">Vocabulary</Link>
            </Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </div>
    </aside>
  );
};

export default _SideBar;

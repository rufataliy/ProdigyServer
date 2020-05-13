import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const _SideBar = ({ links }) => {
  const [open, setOpen] = useState(false);
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
            {links.map(({ title }) => (
              <Link
                className="nav-link btn btn-outline-primary"
                role="button"
                to={(location) => ({
                  ...location,
                  bread: { id: "", lable: title },
                  pathname: `/app${title !== "Home" ? "/" + title : ""}/`,
                })}
              >
                {title}
              </Link>
            ))}
          </Nav>
        </div>
      </div>
    </aside>
  );
};

export default _SideBar;

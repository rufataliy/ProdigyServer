import React, { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const _SideBar = ({ links }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);
  const clickHandler = (e) => {
    if (!e.target.closest(".sidebarWrapper") || e.target.closest(".nav-link")) {
      setOpen(false);
    }
  };
  return (
    <aside>
      <div className={`sidebarWrapper ${open ? "sideOpen" : ""}`}>
        <div className="sidebar-inner">
          <div
            onClick={() => setOpen(true)}
            className="sideBarButton d-flex justify-content-between rounded"
          >
            <span className="sidebar-line"></span>
            <span className="sidebar-line"></span>
            <span className="sidebar-line"></span>
          </div>
          <Nav className="mr-auto pt-5 flex-column">
            {links.map(({ title, path }, index) => (
              <Link
                key={index}
                className="nav-link btn btn-outline-primary"
                role="button"
                to={(location) => ({
                  ...location,
                  pathname: `/app${path}/`,
                  state: { extendable: true },
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

export default memo(_SideBar);

import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../views/_Icon.jsx";
import { links } from "../../utils/links";

const Home = () => {
  return (
    <>
      {links.map(
        (page, index) =>
          page.title !== "Home" && (
            <Link
              key={index}
              type="button"
              to={(location) => ({
                ...location,
                pathname: `/app${page.path}/`,
                state: { extendable: true, parentTitle: "" },
              })}
              className="btn quick-access-btn mr-3 btn-outline-primary"
            >
              <Icon
                className={`quick-access-icon mb-3 mt-3 ${page.iconName}`}
              />
              <span className="d-block quick-access-name">{page.title}</span>
            </Link>
          )
      )}
    </>
  );
};

export default Home;

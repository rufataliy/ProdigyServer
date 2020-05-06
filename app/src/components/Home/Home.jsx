import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../views/_Icon.jsx";
import { links } from "../../utils/links";
const Home = () => {
  return (
    <div>
      {links.map(
        (page) =>
          page.title !== "Home" && (
            <Link
              type="button"
              to={`/app/${page.title}`}
              class="btn quick-access-btn mr-3 btn-outline-primary"
            >
              <Icon
                className={`quick-access-icon mb-3 mt-3 ${page.iconName}`}
              />
              <span className="d-block quick-access-name">{page.title}</span>
            </Link>
          )
      )}
    </div>
  );
};

export default Home;

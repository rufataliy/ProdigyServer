import React from "react";
import { Link } from "react-router-dom";
import Icon from "../views/_Icon.jsx";
const Home = () => {
  return (
    <div>
      <Link
        type="button"
        to="/app/Schedule"
        class="btn quick-access-btn mr-3 btn-outline-primary"
      >
        <Icon className="quick-access-icon mb-3 mt-3 fas fa-calendar-alt" />
        <span className="d-block quick-access-name">Schedule</span>
      </Link>
      <Link
        type="button"
        to="/app/Vocabulary"
        class="btn quick-access-btn mr-3 btn-outline-primary"
      >
        <Icon className="quick-access-icon mb-3 mt-3 fas fa-language" />
        <span className="d-block quick-access-name">Vocabulary</span>
      </Link>
    </div>
  );
};

export default Home;

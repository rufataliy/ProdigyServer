import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import Icon from "../views/_Icon.jsx";
const Lesson = ({ lesson }) => {
  const { lessonId } = useParams();
  const { url } = useRouteMatch();

  return (
    <span className="m-2 quick-access-btn">
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>{lesson.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {lesson.level}
          </Card.Subtitle>
          <Link to={`lessons/${lesson._id}`}>See lesson</Link>
          <Icon
            onClick={() => editlesson(lesson)}
            className="ml-3 fas fa-pen"
          />
          <Icon
            onClick={() => editlesson(lesson)}
            className="ml-3 fas fa-trash"
          />
        </Card.Body>
      </Card>
    </span>
  );
};

export default React.memo(Lesson);

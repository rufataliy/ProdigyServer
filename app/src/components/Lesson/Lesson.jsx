import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "../../views/_Icon.jsx";

const Lesson = ({ lesson, editLesson }) => {
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
            onClick={() => editLesson(lesson)}
            className="ml-3 fas fa-pen"
          />
          <Icon
            onClick={() => editLesson(lesson)}
            className="ml-3 fas fa-trash"
          />
        </Card.Body>
      </Card>
    </span>
  );
};

export default React.memo(Lesson);

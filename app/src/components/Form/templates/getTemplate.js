import React from "react";
import Klasses from "./Klasses.jsx";
import Lessons from "./Lessons.jsx";
import Sections from "./Sections.jsx";
import Programs from "./Programs.jsx";
import Vocabularies from "./Vocabularies.jsx";
import Words from "./Words.jsx";
import Chats from "./Chats.jsx";

export const getTemplate = (props, { collectionName, isAuthor }) => {
  const templates = {
    vocabularies: <Vocabularies {...props} isAuthor={isAuthor} />,
    sections: <Sections {...props} isAuthor={isAuthor} />,
    programs: <Programs {...props} isAuthor={isAuthor} />,
    klasses: <Klasses {...props} isAuthor={isAuthor} />,
    lessons: <Lessons {...props} isAuthor={isAuthor} />,
    newChat: <Chats {...props} isAuthor={isAuthor} />,
    words: <Words {...props} isAuthor={isAuthor} />,
  };
  return templates[collectionName];
};

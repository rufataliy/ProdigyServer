import React from "react";
import Klasses from "./Klasses.jsx";
import Lessons from "./Lessons.jsx";
import Sections from "./Sections.jsx";
import Programs from "./programs.jsx";
import Vocabularies from "./Vocabularies.jsx";
import Words from "./Words.jsx";
import Chats from "./Chats.jsx";

export const getTemplate = (props, { collectionName }) => {
  const templates = {
    klasses: <Klasses {...props} />,
    words: <Words {...props} />,
    vocabularies: <Vocabularies {...props} />,
    programs: <Programs {...props} />,
    lessons: <Lessons {...props} />,
    sections: <Sections {...props} />,
    newChat: <Chats {...props} />,
  };
  return templates[collectionName];
};

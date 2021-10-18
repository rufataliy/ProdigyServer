import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useProgramState, useLessonState, useVocabState } from '../store/useGlobalState';
import { buildRoutes } from './breadcrumbsRoutes';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  const [routes, setRoutes] = useState([]);
  const [{ programs }, setProgramState] = useProgramState();
  const [{ lessons }, setLessonsState] = useLessonState();
  const [{ vocabs }, setVocabState] = useVocabState();

  const getDynamicEntityNameById = (entityName, id) => {
    const entityNameGetters = {
      programs: (id) => programs.find((program) => program._id === id),
      lessons: (id) => lessons.find((lesson) => lesson._id === id),
      vocabs: (id) => vocabs.find((vocab) => vocab._id === id),
    };
    return entityNameGetters[entityName](id)?.title;
  };
  let { pathname } = useLocation();
  useEffect(() => {
    setRoutes(buildRoutes(pathname));
  }, [pathname]);

  return (
    <>
      {routes?.map((route) => {
        const name = route.name
          ? route.name
          : getDynamicEntityNameById(route.entityName, route.id);
        return (
          <span>
            <Link to={route.path}>{name}</Link>
            <span className="mr-2 ml-2">&gt;</span>
          </span>
        );
      })}
    </>
  );
};

export default Breadcrumb;

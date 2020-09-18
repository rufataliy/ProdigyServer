import React from "react";
import { useLocation } from "react-router-dom";
import { getProgramNameById } from "../store/useGlobalState";

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const idToNames = {
    programs: getProgramNameById,
  };
  const paths = pathname.split("/");
  return (
    <>
      {paths?.map((path, index) => {
        let prevPath = paths[index - 1];
        if (idToNames[prevPath]) {
          path = idToNames[prevPath](path);
        }
        return (
          <p>
            <a href={pathname}>{path}</a>
          </p>
        );
      })}
    </>
  );
};

export default Breadcrumb;

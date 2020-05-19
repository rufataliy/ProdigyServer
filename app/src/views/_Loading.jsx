import React from "react";
import LoadingImg from "../public/img/loading.gif";
const _Loading = (props) => {
  return (
    <div className="w-100 h-100">
      <img src={`../${LoadingImg}`} alt="" />
    </div>
  );
};

export default _Loading;

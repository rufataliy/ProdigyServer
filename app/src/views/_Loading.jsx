import React from "react";
import LoadingImg from "../public/img/loading.gif";

const _Loading = () => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-baseline h-100">
      <img src={LoadingImg} alt="loader" />
    </div>
  );
};

export default _Loading;

import React from "react";

const Cell = ({ idx, idy, alive, clickHandler }) => {
  return (
    <div
      className={`${alive ? "bg-emerald-500" : "bg-red-500"}`}
      onClick={clickHandler}
    >
      R
    </div>
  );
};

export default Cell;

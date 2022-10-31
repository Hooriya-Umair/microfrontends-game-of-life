import React from "react";

const Cell = ({ alive, clickHandler }) => {
  return (
    <div
      className={` cursor-pointer p-2 ${alive ? "bg-white-500" : "bg-red-500"}`}
      onClick={clickHandler}
    >
      R
    </div>
  );
};

export default Cell;

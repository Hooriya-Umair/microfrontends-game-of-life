import React from "react";

const Cell = ({ idx, idy, alive, clickHandler }) => {
  return <div onClick={clickHandler}>R{JSON.stringify(alive)}</div>;
};

export default Cell;

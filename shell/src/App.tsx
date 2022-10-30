import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import useGameState, { GameStateProvider } from "state/useGameState";
// import { ActionType } from "./state/types";

import "./index.scss";

const width = 25;
const height = 25;

const ReactCell = React.lazy(() => import("react_cell/Cell"));
// const useGameState = React.lazy(() => import("state/useGameState"));

const App = () => {
  const { state, dispatch } = useGameState();
  console.log({ state, dispatch });

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: "init", payload: { width, height } });
    }
  }, []);

  const cellClick = ({ idx, idy }) =>
    dispatch && dispatch({ type: "click", payload: { idx, idy } });

  const reset = () =>
    dispatch && dispatch({ type: "init", payload: { width, height } });

  const play = () => dispatch && dispatch({ type: "tick", payload: {} });

  const { cells } = state;
  console.log({ cells });
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <button className={"m-2"} onClick={play}>
        Step
      </button>
      <button className={"m-2"} onClick={reset}>
        Reset
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        {cells.map((row, idy) => {
          return (
            <div className="flex" key={idy}>
              {row.map((col, idx) => {
                return (
                  <ReactCell
                    key={idx}
                    idx={idx}
                    idy={idy}
                    alive={cells[idy][idx]}
                    clickHandler={() => cellClick({ idx, idy })}
                  />
                );
              })}
            </div>
          );
        })}
      </Suspense>
    </div>
  );
};
ReactDOM.render(
  <GameStateProvider>
    <App />
  </GameStateProvider>,
  document.getElementById("app")
);

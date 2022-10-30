import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import useGameState, { GameStateProvider } from "./state/useGameState";
import { ActionType } from "./state/types";

import "./index.scss";

const ReactCell = React.lazy(() => import("react_cell/Cell"));
const App = () => {
  const { state, dispatch } = useGameState();
  console.log({ state, dispatch });
  // console.log({ dis: wer.dispatch });

  // useEffect(() => {
  //   console.log({ wer });
  // }, [wer]);

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: "init", payload: { width: 10, height: 10 } });
    }
  }, []);

  const cellClick = ({ idx, idy }) =>
    dispatch && dispatch({ type: "click", payload: { idx, idy } });

  const { cells } = state;
  console.log({ cells });
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
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

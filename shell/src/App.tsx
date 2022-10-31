import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import useGameState, { GameStateProvider } from "state/useGameState";
import { StateType, ActionType } from "state/types";
import WebComponentWrapper from "./WebComponentWrapper";
import "./index.scss";

const ReactCell = React.lazy(() => import("react_cell/Cell"));

const width = 25;
const height = 25;

const App = () => {
  const {
    state,
    dispatch,
  }: { state: StateType; dispatch: ({}: ActionType) => void } = useGameState();

  useEffect(() => {
    if (dispatch) {
      dispatch({ type: "init", payload: { width, height } });
    }
  }, []);

  const cellClick = ({ idx, idy }: { idx: number; idy: number }) =>
    dispatch && dispatch({ type: "click", payload: { idx, idy } });

  const reset = () =>
    dispatch && dispatch({ type: "init", payload: { width, height } });

  const random = () =>
    dispatch && dispatch({ type: "random", payload: { width, height } });

  const play = () => dispatch && dispatch({ type: "tick", payload: {} });

  const { cells } = state;
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <button className={"m-2"} onClick={play}>
        Step
      </button>
      <button className={"m-2"} onClick={random}>
        Random
      </button>
      <button className={"m-2"} onClick={reset}>
        Reset
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        {cells.map((row: boolean[], idy: number) => {
          return (
            <div className="flex" key={idy}>
              {row.map((col, idx) => {
                return (
                  <>
                    {idx % 2 === 0 ? (
                      <ReactCell
                        key={idx}
                        alive={cells[idy][idx]}
                        clickHandler={() => cellClick({ idx, idy })}
                      />
                    ) : (
                      <WebComponentWrapper
                        alive={cells[idy][idx] ? "true" : "false"}
                        clickHandler={() => cellClick({ idx, idy })}
                      />
                    )}
                  </>
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

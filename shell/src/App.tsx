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

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex">
          <ReactCell />
          <ReactCell />
          <ReactCell />
          <ReactCell />
          <ReactCell />
          <ReactCell />
        </div>
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

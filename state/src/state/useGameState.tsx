import * as React from "react";
import { initiateBoard, tick } from "./engine";
import { StateType, ActionType } from "../types";

const initialState: StateType = {
  width: 0,
  height: 0,
  cells: [],
};

const GameStateContext = React.createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType> | null;
}>({ state: initialState, dispatch: () => {} });
GameStateContext.displayName = "GameStateContext";
function gameStateReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "init": {
      const { width, height } = action.payload;
      if (!width || !height) throw "width and height must be provided";
      return {
        ...state,
        width,
        height,
        cells: initiateBoard(width, height, false),
      };
    }
    case "click": {
      const { idx, idy } = action.payload;
      if (idx === undefined || idy === undefined)
        throw "idx and idy must be provided";
      const toggledCellState = !state.cells[idy][idx];
      const newCellsState = [...state.cells];
      newCellsState[idy][idx] = toggledCellState;
      return {
        ...state,
        cells: newCellsState,
      };
    }
    case "tick": {
      const { width, height, cells } = state;
      return {
        ...state,
        cells: tick({ width, height, cells }),
      };
    }
    case "random": {
      const { width, height } = action.payload;
      if (!width || !height) throw "width and height must be provided";
      return {
        ...state,
        cells: initiateBoard(width, height, true),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function GameStateProvider({ children }) {
  const [state, dispatch] = React.useReducer(gameStateReducer, initialState);
  return (
    //TODO: typescript errors here if passing as array
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

function useGameState() {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error(`useGameState must be used within a GameStateProvider`);
  }
  console.log({ context });
  return context;
}

export default useGameState;

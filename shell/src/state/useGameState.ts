import * as React from "react";
import { initiateBoard, tick } from "./engine";
// import { dequal } from "dequal";

// ./context/user-context.js

// import * as userClient from "../user-client";
// import { useAuth } from "../auth-context";

const initialState = {
  tick: 0,
  width: 0,
  height: 0,
  cells: [],
};

const GameStateContext = React.createContext(initialState);
GameStateContext.displayName = "GameStateContext";

function userReducer(state, action) {
  switch (action.type) {
    case "init": {
      const { width, height } = action.payload;
      return {
        ...state,
        width,
        height,
        cells: initiateBoard,
      };
    }
    case "click": {
      const { idx, idy } = action.payload;
      const toggledCellState = !state.cells[idx][idy];
      const newCellsState = [...state.cells];
      newCellsState[idx][idy] = toggledCellState;
      return {
        ...state,
        cells: newCellsState,
      };
    }
    case "tick": {
      const { width, height, cells } = state;
      return {
        ...state,
        tick: state.tick + 1,
        cells: tick({ width, height, cells }),
      };
    }
    case "reset": {
      return {
        ...state,
        status: null,
        error: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = React.useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  });
  const value = [state, dispatch];
  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}

function useUser() {
  const context = React.useContext(GameStateContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

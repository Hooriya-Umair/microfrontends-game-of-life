export type CellsType = boolean[][];

export type StateType = {
  width: number;
  height: number;
  cells: CellsType;
};

export type ActionType = {
  type: string;
  payload: {
    width?: number;
    height?: number;
    idx?: number;
    idy?: number;
  };
};

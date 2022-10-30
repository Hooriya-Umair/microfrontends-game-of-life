import { StateType, CellsType } from "./types";

export const initiateBoard = (width: number, height: number): CellsType =>
  new Array(height).fill([]).map(() => Array(width).fill(false));

// NOTE: for gol we only care about the number of neighbors with true values
const getCountAliveNeighbors = ({ width, height, idx, idy, cells }) => {
  const isTopEdge = idy - 1 < 0;
  const isLeftEdge = idx - 1 < 0;
  const isBottomEdge = idy + 1 > height - 1;
  const isRightEdge = idx + 1 > width - 1;
  return [
    ...(!isTopEdge && !isLeftEdge ? [cells[idy - 1][idx - 1]] : []),
    ...(!isTopEdge && !isRightEdge ? [cells[idy - 1][idx + 1]] : []),
    ...(!isTopEdge ? [cells[idy - 1][idx]] : []),
    ...(!isLeftEdge ? [cells[idy][idx - 1]] : []),
    ...(!isRightEdge ? [cells[idy][idx + 1]] : []),
    ...(!isBottomEdge ? [cells[idy + 1][idx]] : []),
    ...(!isBottomEdge && !isLeftEdge ? [cells[idy + 1][idx - 1]] : []),
    ...(!isBottomEdge && !isRightEdge ? [cells[idy + 1][idx + 1]] : []),
  ].filter(Boolean).length;
};

export const tick = ({
  width,
  height,
  cells,
}: Pick<StateType, "height" | "width" | "cells">): CellsType =>
  cells.map((nextRow, idy) => {
    return nextRow.map((cell, idx) => {
      const numNeighborsAlive = getCountAliveNeighbors({
        width,
        height,
        idx,
        idy,
        cells,
      });
      // GOL RULES
      // if 3 neighbors alive then cell springs to life if dead
      // if cell already alive then it stays alive if two or 3 neighvors alive
      if (!cell && numNeighborsAlive === 3) return true;
      if (cell && numNeighborsAlive > 1 && numNeighborsAlive < 4) return true;
      return false;
    });
  });

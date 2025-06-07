import { BoxProps } from "./box";
import { PlacedBox } from "./placed-box";

// This file contains messy logic that can be improved later.

type BooleanGrid = boolean[][];

const createEmptyGrid = (rows: number, cols: number): BooleanGrid => {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
};

const canPlaceBox = (
  booleanGrid: BooleanGrid,
  startRow: number,
  startCol: number,
  boxRows: number,
  boxCols: number
): boolean => {
  if (startRow + boxRows > booleanGrid.length) return false;
  if (startCol + boxCols > booleanGrid[0].length) return false;

  for (let r = startRow; r < startRow + boxRows; r++) {
    for (let c = startCol; c < startCol + boxCols; c++) {
      if (booleanGrid[r][c]) {
        return false;
      }
    }
  }

  return true;
};

const placeBoxInGrid = (
  booleanGrid: BooleanGrid,
  startRow: number,
  startCol: number,
  boxRows: number,
  boxCols: number
) => {
  for (let r = startRow; r < startRow + boxRows; r++) {
    for (let c = startCol; c < startCol + boxCols; c++) {
      booleanGrid[r][c] = true;
    }
  }
};

const tryPlaceBox = (
  booleanGrid: BooleanGrid,
  box: BoxProps,
  cols: number,
  rows: number
): PlacedBox | null => {
  for (let r = 0; r <= booleanGrid.length - rows; r++) {
    for (let c = 0; c <= booleanGrid[0].length - cols; c++) {
      if (canPlaceBox(booleanGrid, r, c, rows, cols)) {
        placeBoxInGrid(booleanGrid, r, c, rows, cols);
        return { ...box, cols, rows, startCol: c, startRow: r };
      }
    }
  }
  return null;
};

export const fitBoxes = (
  gridCols: number,
  gridRows: number,
  boxes: BoxProps[]
): PlacedBox[] => {
  const grid = createEmptyGrid(gridRows, gridCols);
  const sortedBoxes = [...boxes].sort((a, b) => a.priority - b.priority);
  const placedBoxes: PlacedBox[] = [];

  for (const box of sortedBoxes) {
    let placed: PlacedBox | null = null;
    for (let cols = box.preferredCols; cols >= box.minCols && !placed; cols--) {
      for (
        let rows = box.preferredRows;
        rows >= box.minRows && !placed;
        rows--
      ) {
        placed = tryPlaceBox(grid, box, cols, rows);
      }
    }
    if (placed) placedBoxes.push(placed);
  }

  return placedBoxes;
};

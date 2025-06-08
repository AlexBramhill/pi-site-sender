import { BoxConfig } from "./box-config";
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
  box: BoxConfig,
  cols: number,
  rows: number
): PlacedBox | null => {
  for (let r = 0; r <= booleanGrid.length - rows; r++) {
    for (let c = 0; c <= booleanGrid[0].length - cols; c++) {
      if (canPlaceBox(booleanGrid, r, c, rows, cols)) {
        placeBoxInGrid(booleanGrid, r, c, rows, cols);
        console.log(
          `Placed box ${box.key} at (${r}, ${c}) with size ${cols}x${rows}`
        );
        return { ...box, cols, rows, startCol: c, startRow: r };
      }
    }
  }
  console.log(
    `Could not place box ${box.key} with size ${cols}x${rows}, trying smaller sizes`
  );
  return null;
};

export const fitBoxes = (
  gridCols: number,
  gridRows: number,
  boxes: BoxConfig[]
): PlacedBox[] => {
  const grid = createEmptyGrid(gridRows, gridCols);
  const placedBoxes: PlacedBox[] = [];

  for (const box of boxes) {
    console.log(
      `Fitting box ${box.key} with preferred size ${box.preferredCols}x${box.preferredRows}`
    );
    let placed: PlacedBox | null = null;
    placingLoop: for (
      let cols = box.preferredCols;
      cols >= box.minCols && !placed;
      cols--
    ) {
      for (
        let rows = box.preferredRows;
        rows >= box.minRows && !placed;
        rows--
      ) {
        console.log(`Trying to place box ${box.key} with size ${cols}x${rows}`);
        placed = tryPlaceBox(grid, box, cols, rows);
        if (placed) {
          placedBoxes.push(placed);
          break placingLoop;
        }
      }
    }
  }

  return placedBoxes;
};

"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useGridSize = () => {
  const [gridSize, setGridSize] = useState({ cols: 1, rows: 1 });

  useEffect(() => {
    const handleResize = () => updateGridSize(setGridSize);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return gridSize;
};

const updateGridSize = (
  setGridSize: Dispatch<
    SetStateAction<{
      cols: number;
      rows: number;
    }>
  >
) => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const maxCols = 6;
  const maxRows = 6;
  const cellWidth = 96;
  const cellHeight = 96;

  const cols = Math.min(maxCols, Math.max(1, Math.floor(width / cellWidth)));
  const rows = Math.min(maxRows, Math.max(1, Math.floor(height / cellHeight)));

  setGridSize({ cols, rows });
};

export default useGridSize;

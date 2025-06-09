"use client";

import useGridSize from "@/app/hooks/use-grid-size";
import { boxes } from "@/app/components/boxes/boxes";
import { fitBoxes } from "./grid-helper";
import { Box } from "./box";

export const Grid: React.FC = () => {
  const { cols, rows } = useGridSize();

  const placedBoxes = fitBoxes(cols, rows, boxes);

  return (
    <div
      className="grid gap-2 w-full h-full p-2"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {placedBoxes.map((box) => (
        <Box
          key={box.key}
          gridColumnStart={box.startCol + 1}
          gridColumnSpan={box.cols}
          gridRowStart={box.startRow + 1}
          gridRowSpan={box.rows}
        >
          {box.content}
        </Box>
      ))}
    </div>
  );
};

"use client";

import useGridSize from "@/app/hooks/use-grid-size";
import { boxes } from "@/app/components/boxes/boxes";
import { fitBoxes } from "./grid-helper";

export const Grid: React.FC = () => {
  const { cols, rows } = useGridSize();

  const placedBoxes = fitBoxes(cols, rows, boxes);

  return (
    <div
      className="grid gap-3 w-full h-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
    >
      {placedBoxes.map((box) => (
        <div
          key={box.id}
          className="bg-blue-600 text-white rounded flex items-center justify-center text-center p-2"
          style={{
            gridColumnStart: box.startCol + 1,
            gridColumnEnd: `span ${box.cols}`,
            gridRowStart: box.startRow + 1,
            gridRowEnd: `span ${box.rows}`,
            userSelect: "none",
          }}
          title={`Priority: ${box.priority}\nSize: ${box.cols}x${box.rows}`}
        >
          {box.label}
          <br />
        </div>
      ))}
    </div>
  );
};

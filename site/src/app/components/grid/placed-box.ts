import { BoxProps } from "./box";

export interface PlacedBox extends BoxProps {
  cols: number;
  rows: number;
  startCol: number;
  startRow: number;
}

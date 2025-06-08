import { BoxConfig } from "./box-config";

export interface PlacedBox extends BoxConfig {
  cols: number;
  rows: number;
  startCol: number;
  startRow: number;
}

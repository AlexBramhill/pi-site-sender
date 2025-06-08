import React from "react";

export interface BoxConfig {
  key: string;
  minCols: number;
  minRows: number;
  preferredCols: number;
  preferredRows: number;
  content: React.ReactNode;
}

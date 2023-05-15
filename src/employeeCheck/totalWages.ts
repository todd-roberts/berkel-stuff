import { ParseParams } from "./types";
import { parseNumber } from "../utils";

export const parseTotalWages = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  return {
    projectWage: parseNumber(lines[3]) ?? 0,
    totalGross: parseNumber(lines[4]) ?? 0,
  };
};

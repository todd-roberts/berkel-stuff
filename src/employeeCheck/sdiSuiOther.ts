import { ParseParams } from "./types";
import { parseNumber } from "../utils";

export const parseSdiSuiOther = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  return (
    parseNumber(lines[3]) ||
    parseNumber(lines[4]) ||
    parseNumber(lines[5]) ||
    parseNumber(lines[6])
  );
};

import { ParseParams } from "./types";
import { parseNumber } from "../utils";

export const parseTotalDeductions = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  const line = lines[4];

  const value = parseNumber(line) ?? 0;

  const totalDeductions = line.includes("-") ? -1 * value : value;

  return totalDeductions;
};

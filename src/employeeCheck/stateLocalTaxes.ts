import { ParseParams } from "./types";
import { parseNumber } from "../utils";

export const parseStateLocalTaxes = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  return {
    state: parseNumber(lines[3]),
    local: parseNumber(lines[4]),
  };
};

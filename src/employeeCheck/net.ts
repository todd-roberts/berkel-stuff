import { ParseParams } from "./types";
import { parseNumber } from "../utils";

export const parseNet = ({ allLines, columnStart, columnEnd }: ParseParams) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  return parseNumber(lines[4]) ?? 0;
};

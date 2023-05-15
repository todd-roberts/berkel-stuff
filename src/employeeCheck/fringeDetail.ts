import { ParseParams } from "./types";
import { parseNumber } from "../utils";

export const parseFringeDetail = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams) => {
  const lines = allLines
    .map((line) => line.slice(columnStart, columnEnd).trim())
    .slice(3);

  return lines
    .filter((line) => /^([$a-zA-Z0-9\s-]+)\s+(\d+\.\d{2})$/.test(line))
    .map((line) => {
      const [description, amount] = line.split(/\s+(?=\d)/); // Split by whitespace that's followed by a digit

      return {
        description: description.trim(),
        amount: parseNumber(amount) ?? 0,
      };
    });
};

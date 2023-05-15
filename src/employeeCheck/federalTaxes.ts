import { ParseParams } from "./types";
import { parseNumber } from "../utils";

export const parseFederalTaxes = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  return {
    federalIncomeTax: parseNumber(lines[3]),
    fica: parseNumber(lines[4]),
    medicare: parseNumber(lines[5]),
    federalExemptions: parseNumber(lines[6]),
  };
};

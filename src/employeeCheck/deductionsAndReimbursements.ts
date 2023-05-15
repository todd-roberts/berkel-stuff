import { Deduction, ParseParams, Reimbursement } from "./types";

import { parseNumber } from "../utils";

export const parseDeductionsAndReimbursements = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams) => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  const deductions: Deduction[] = [];
  const reimbursements: Reimbursement[] = [];

  for (const line of lines) {
    const deductionMatches = line.matchAll(/(DED:\d{3}) (\S+) (\d+\.\d{2})/g);
    for (const match of deductionMatches) {
      deductions.push({
        code: match[1],
        description: match[2],
        amount: parseNumber(match[3]),
      });
    }

    const reimbursementMatches = line.matchAll(
      /(RMB:\d{3}) (\S+) (\d+\.\d{2})/g
    );

    for (const match of reimbursementMatches) {
      reimbursements.push({
        code: match[1],
        description: match[2],
        amount: parseNumber(match[3]),
      });
    }
  }

  return {
    deductions,
    reimbursements,
  };
};

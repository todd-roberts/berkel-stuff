import { EmployeeCheck } from "./types";
import { parseDeductionsAndReimbursements } from "./deductionsAndReimbursements";
import { parseEmployee } from "./employee";
import { parseFederalTaxes } from "./federalTaxes";
import { parseFringeDetail } from "./fringeDetail";
import { parseHoursWorked } from "./hoursWorked";
import { parseNet } from "./net";
import { parsePayClassAndRate } from "./payClassAndRate";
import { parseSdiSuiOther } from "./sdiSuiOther";
import { parseStateLocalTaxes } from "./stateLocalTaxes";
import { parseTotalDeductions } from "./totalDeductions";
import { parseTotalWages } from "./totalWages";

export type { EmployeeCheck };

export const isEmployeeCheckStart = (line: string) =>
  line.startsWith(" ** PAY CLASS");

export const parseEmployeeCheck = (lines: string[]): EmployeeCheck => {
  const { payClass, payRate } = parsePayClassAndRate(lines);

  const employee = parseEmployee({
    allLines: lines,
    columnStart: 0,
    columnEnd: 30,
  });

  const hoursWorked = parseHoursWorked({
    allLines: lines,
    columnStart: 30,
    columnEnd: 95,
  });

  const { projectWage, totalGross } = parseTotalWages({
    allLines: lines,
    columnStart: 95,
    columnEnd: 106,
  });

  const federalTaxes = parseFederalTaxes({
    allLines: lines,
    columnStart: 106,
    columnEnd: 115,
  });

  const { state, local } = parseStateLocalTaxes({
    allLines: lines,
    columnStart: 115,
    columnEnd: 127,
  });

  const sdiSuiOther = parseSdiSuiOther({
    allLines: lines,
    columnStart: 127,
    columnEnd: 139,
  });

  const totalDeductions = parseTotalDeductions({
    allLines: lines,
    columnStart: 139,
    columnEnd: 148,
  });

  const net = parseNet({
    allLines: lines,
    columnStart: 148,
    columnEnd: 159,
  });

  const { deductions, reimbursements } = parseDeductionsAndReimbursements({
    allLines: lines,
    columnStart: 95,
    columnEnd: 159,
  });

  const fringeDetail = parseFringeDetail({
    allLines: lines,
    columnStart: 159,
    columnEnd: 200,
  });

  return {
    payClass,
    payRate,
    employee,
    hoursWorked,
    projectWage,
    totalGross,
    taxes: {
      federal: federalTaxes,
      state,
      local,
    },
    sdiSuiOther,
    totalDeductions,
    net,
    fringeDetail,
    deductions,
    reimbursements,
  };
};

import { Header } from "../../types";
import { ParsedReport } from "../../../parseReport";

const MAX_DEDUCTION_COLUMNS = 22;
const MAX_FRINGE_COLUMNS = 10;

export const createDeductionColumns = (
  parsedReport: ParsedReport
): Header[] => {
  const allDeductions = parsedReport.projects
    .map((project) => project.employeeChecks.map((check) => check.deductions))
    .flat(2);

  let uniqueDescriptions = [
    ...new Set(allDeductions.map(({ description }) => description)),
  ];

  /* 
    handle Child Support (CHS) whereby multiple payments are given separate descriptions
    e.g. CHS-1, CHS-2, etc. 
  */
  uniqueDescriptions = uniqueDescriptions
    .filter((description) => !description.startsWith("CHS-"))
    .concat(["CHS"]);

  uniqueDescriptions.sort();

  if (uniqueDescriptions.length > MAX_DEDUCTION_COLUMNS) {
    throw new Error(
      `There are ${
        uniqueDescriptions.length
      } unique deduction descriptions (e.g. "DENT").
      This exceeds the max (${MAX_DEDUCTION_COLUMNS}) allowed by EMARS.
      Descriptions parsed:
      ${JSON.stringify(uniqueDescriptions)}`
    );
  }

  return uniqueDescriptions.map((description) => {
    return {
      id: description,
      title: `Ded ${description}`,
    };
  });
};

export const createFringeColumns = (parsedReport: ParsedReport): Header[] => {
  const allFringes = parsedReport.projects
    .map((project) => project.employeeChecks.map((check) => check.fringeDetail))
    .flat(2);

  const uniqueDescriptions = [
    ...new Set(allFringes.map(({ description }) => description)),
  ];

  if (uniqueDescriptions.length > MAX_FRINGE_COLUMNS) {
    throw new Error(
      `There are ${
        uniqueDescriptions.length
      } unique fringe descriptions (e.g. "$30000").
      This exceeds the max (${MAX_FRINGE_COLUMNS}) allowed by EMARS.
      Descriptions parsed:
      ${JSON.stringify(uniqueDescriptions)}`
    );
  }

  return uniqueDescriptions.map((description) => {
    return {
      id: description,
      title: `Fringe ${description}`,
    };
  });
};

export const createHeaders = (
  deductionColumns: Header[],
  fringeColumns: Header[]
) => [
  { id: "ssn", title: "SSN" },
  { id: "firstName", title: "First Name" },
  { id: "lastName", title: "Last Name" },
  {
    id: "sex",
    title: "Sex",
  },
  {
    id: "ethnicity",
    title: "Ethnicity",
  },
  {
    id: "addressLine1",
    title: "Address Line 1",
  },
  {
    id: "TODO: Is this address line 2? City? Something else?",
    title: "",
  },
  {
    id: "state",
    title: "State",
  },
  {
    id: "zip",
    title: "ZIP",
  },
  {
    id: "workClass",
    title: "WorkClass",
  },
  {
    id: "appLevel",
    title: "App. Level",
  },
  {
    id: "appPercent",
    title: "App Percent",
  },
  {
    id: "straightTime1",
    title: "ST1",
  },
  {
    id: "straightTime2",
    title: "ST2",
  },
  {
    id: "straightTime3",
    title: "ST3",
  },
  {
    id: "straightTime4",
    title: "ST4",
  },
  {
    id: "straightTime5",
    title: "ST5",
  },
  {
    id: "straightTime6",
    title: "ST6",
  },
  {
    id: "straightTime7",
    title: "ST7",
  },
  {
    id: "overtime1",
    title: "OT1",
  },
  {
    id: "overtime2",
    title: "OT2",
  },
  {
    id: "overtime3",
    title: "OT3",
  },
  {
    id: "overtime4",
    title: "OT4",
  },
  {
    id: "overtime5",
    title: "OT5",
  },
  {
    id: "overtime6",
    title: "OT6",
  },
  {
    id: "overtime7",
    title: "OT7",
  },
  {
    id: "doubleTime1",
    title: "DT1",
  },
  {
    id: "doubleTime2",
    title: "DT2",
  },
  {
    id: "doubleTime3",
    title: "DT3",
  },
  {
    id: "doubleTime4",
    title: "DT4",
  },
  {
    id: "doubleTime5",
    title: "DT5",
  },
  {
    id: "doubleTime6",
    title: "DT6",
  },
  {
    id: "doubleTime7",
    title: "DT7",
  },
  {
    id: "doubleTimePayRate",
    title: "Doubletime Pay Rate",
  },
  {
    id: "overtimePayRate",
    title: "Overtime Pay Rate",
  },
  {
    id: "straightTimePayRate",
    title: "Regular Pay Rate",
  },
  {
    id: "doubleTimeCashFringe",
    title: "DT Cash Fringe",
  },
  {
    id: "overtimeCashFringe",
    title: "OT Rate Cash Fringe",
  },
  {
    id: "straightTimeCashFringe",
    title: "Reg. Rate Cash Fringe",
  },
  {
    id: "federalWitholding",
    title: "FWH",
  },
  {
    id: "fica",
    title: "FICA",
  },
  {
    id: "medicare",
    title: "Medicare",
  },
  {
    id: "stateTax",
    title: "StateTax",
  },
  {
    id: "localTax1",
    title: "Local Tax1",
  },
  {
    id: "localTax2",
    title: "Local Tax2",
  },
  ...deductionColumns,
  {
    id: "exemptions",
    title: "Exemptions",
  },
  {
    id: "checkNumber",
    title: "Check Number",
  },
  {
    id: "grossPay",
    title: "Gross Pay",
  },
  {
    id: "netPay",
    title: "Net Pay",
  },
  ...fringeColumns,
];

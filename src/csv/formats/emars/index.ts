import { Format, Header } from "../../types";
import {
  createDeductionColumns,
  createFringeColumns,
  createHeaders,
} from "./headers";

import { EmarsRow } from "./types";
import { EmployeeCheck } from "../../../employeeCheck";
import { ParsedReport } from "../../../parseReport";
import { formatToNDecimalPlaces } from "../../../utils";

/*
  This returns a "static" row, meaning it contains only the columns that aren't dynamic
  (like the deduction columns) 
 */
const toStaticEmarsRow = (employeeCheck: EmployeeCheck): EmarsRow => ({
  ssn: employeeCheck.employee.ssn,
  firstName: employeeCheck.employee.firstName,
  lastName: employeeCheck.employee.lastName,
  sex: employeeCheck.employee.gender === "Male" ? "M" : "F",
  ethnicity: employeeCheck.employee.race,
  addressLine1: employeeCheck.employee.address.streetAddress,
  state: employeeCheck.employee.address.state,
  zip: employeeCheck.employee.address.zip,
  workClass: employeeCheck.payClass,
  appLevel: "",
  appPercent: "",
  straightTime1: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.sunday
  ),
  straightTime2: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.monday
  ),
  straightTime3: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.tuesday
  ),
  straightTime4: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.wednesday
  ),
  straightTime5: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.thursday
  ),
  straightTime6: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.friday
  ),
  straightTime7: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.hours.saturday
  ),
  overtime1: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.sunday
  ),
  overtime2: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.monday
  ),
  overtime3: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.tuesday
  ),
  overtime4: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.wednesday
  ),
  overtime5: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.thursday
  ),
  overtime6: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.friday
  ),
  overtime7: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.hours.saturday
  ),
  doubleTime1: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.sunday
  ),
  doubleTime2: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.monday
  ),
  doubleTime3: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.tuesday
  ),
  doubleTime4: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.wednesday
  ),
  doubleTime5: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.thursday
  ),
  doubleTime6: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.friday
  ),
  doubleTime7: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.hours.saturday
  ),
  doubleTimePayRate: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.doubleTime.payRate,
    3
  ),
  overtimePayRate: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.timeAndAHalf.payRate,
    3
  ),
  straightTimePayRate: formatToNDecimalPlaces(
    employeeCheck.hoursWorked.thisProject.straightTime.payRate,
    3
  ),
  federalWitholding: formatToNDecimalPlaces(
    employeeCheck.taxes.federal.federalIncomeTax,
    3
  ),
  fica: formatToNDecimalPlaces(employeeCheck.taxes.federal.fica, 3),
  medicare: formatToNDecimalPlaces(employeeCheck.taxes.federal.medicare, 3),
  stateTax: formatToNDecimalPlaces(employeeCheck.taxes.state, 3),
  localTax1: formatToNDecimalPlaces(employeeCheck.taxes.local, 3),
  exemptions: formatToNDecimalPlaces(
    employeeCheck.taxes.federal.federalExemptions,
    0
  ),
  grossPay: formatToNDecimalPlaces(employeeCheck.totalGross, 3),
  netPay: formatToNDecimalPlaces(employeeCheck.net, 3),
});

const toRowDeductions = (
  { deductions }: EmployeeCheck,
  deductionColumns: Header[]
) => {
  const deductionsObj: Record<string, unknown> = {};

  for (const column of deductionColumns) {
    const columnDeductions =
      column.id === "CHS"
        ? deductions.filter((deduction) =>
            deduction.description.startsWith("CHS-")
          )
        : deductions.filter((deduction) => deduction.description === column.id);

    const mergedValue = columnDeductions.reduce(
      (acc, columnDeduction) => acc + (columnDeduction.amount ?? 0),
      0
    );

    deductionsObj[column.id] = formatToNDecimalPlaces(mergedValue, 3);
  }

  return deductionsObj;
};

const toRowFringes = (
  { fringeDetail }: EmployeeCheck,
  fringeColumns: Header[]
) => {
  const fringesObj: Record<string, unknown> = {};

  for (const column of fringeColumns) {
    const amount = fringeDetail.find(
      ({ description }) => description === column.id
    )?.amount;

    fringesObj[column.id] = formatToNDecimalPlaces(amount, 3);
  }

  return fringesObj;
};

export const getEmarsFormat = (parsedReport: ParsedReport): Format => {
  const employeeChecks = parsedReport.projects
    .map((project) => project.employeeChecks)
    .flat();

  const deductionColumns = createDeductionColumns(parsedReport);
  const fringeColumns = createFringeColumns(parsedReport);

  return {
    label: "emars",
    header: createHeaders(deductionColumns, fringeColumns),
    toRows: () => {
      return employeeChecks.map((employeeCheck) => {
        const staticRow = toStaticEmarsRow(employeeCheck);

        return {
          ...staticRow,
          ...toRowDeductions(employeeCheck, deductionColumns),
          ...toRowFringes(employeeCheck, fringeColumns),
        };
      });
    },
  };
};

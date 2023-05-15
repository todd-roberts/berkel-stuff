import { EmployeeCheck, ParseParams } from "./types";

export const parseEmployee = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams): EmployeeCheck["employee"] => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  const nameLine = lines[2];

  const [lastName, firstNameAndInitial] = nameLine.split(",");
  const [firstName, middleInitial] = firstNameAndInitial.trim().split(" ");

  const addressLine = lines[3];
  const streetAddress = addressLine.trim();

  const cityStateZipLine = lines[4];
  const [city, stateZip] = cityStateZipLine.split(", ");
  const [state, zip] = stateZip.split(" ");

  const ssnGenderLine = lines[5];
  const ssn = ssnGenderLine.slice(0, 11).trim();
  const gender = ssnGenderLine.slice(12, 16).trim();

  const raceLine = lines[6];
  const race = raceLine.trim();

  return {
    firstName,
    lastName,
    middleInitial,
    ssn,
    race,
    gender,
    address: {
      city,
      state,
      streetAddress,
      zip,
    },
  };
};

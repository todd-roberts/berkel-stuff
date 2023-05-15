import { EmployeeCheck, ParseParams, PayTypeHours, WeeklyHours } from "./types";

import { parseNumber } from "../utils";

export const parseHoursWorked = ({
  allLines,
  columnStart,
  columnEnd,
}: ParseParams): EmployeeCheck["hoursWorked"] => {
  const lines = allLines.map((line) => line.slice(columnStart, columnEnd));

  const dayColumns = [1, 8, 15, 22, 29, 36, 43];
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const parseDayHours = (line: string, dayColumn: number) =>
    parseNumber(line.slice(dayColumn, dayColumn + 7).trim());

  const getHoursForLine = (lineIndex: number): PayTypeHours => {
    const line = lines[lineIndex];
    let hours: WeeklyHours = {};

    for (let i = 0; i < days.length; i++) {
      hours[days[i] as keyof WeeklyHours] = parseDayHours(line, dayColumns[i]);
    }

    const payRate = parseNumber(line.slice(58)) || undefined;

    return {
      hours,
      payRate,
    };
  };

  const hoursWorked = {
    thisProject: {
      straightTime: getHoursForLine(3),
      timeAndAHalf: getHoursForLine(4),
      doubleTime: getHoursForLine(5),
    },
  };

  const otherProjectsLine = lines[6];

  if (!otherProjectsLine?.startsWith("Other Projects:")) {
    return hoursWorked;
  }

  return {
    ...hoursWorked,
    otherProjects: {
      straightTime: getHoursForLine(7),
      timeAndAHalf: getHoursForLine(8),
      doubleTime: getHoursForLine(9),
    },
  };
};

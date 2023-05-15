export const parseReportDate = (reportLines: string[]): Date => {
  const line = reportLines.find((line) =>
    line.startsWith("Certified Payroll-")
  );
  if (!line) {
    throw new Error("Could not find line with date");
  }

  const [, , dateString] = line.trim().split(/\s{2,}/);

  const [month, day, year] = dateString.split(" ");

  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(month);

  const date = new Date(Date.UTC(parseInt(year), monthIndex, parseInt(day)));

  if (isNaN(date.getTime())) {
    throw new Error(`Could not parse date: ${dateString}`);
  }

  return date;
};

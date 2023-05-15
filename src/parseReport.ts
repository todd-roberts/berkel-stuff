import { Project } from "./project/types";
import { parseProjects } from "./project";
import { parseReportDate } from "./reportDate";

export type ParsedReport = {
  reportDate: Date;
  projects: Project[];
};

export const parseReport = (fileContents: string) => {
  const reportLines = fileContents.split("\n");

  return {
    reportDate: parseReportDate(reportLines),
    projects: parseProjects(reportLines),
  };
};

import { isEmployeeCheckStart, parseEmployeeCheck } from "../employeeCheck";

import { Project } from "./types";

export const isProjectStartLine = (line: string) =>
  line.startsWith("*** PROJECT ID");

export const parseProjectId = (line: string) =>
  line.slice(14, line.lastIndexOf("***") - 1).trim();

export function parseProjects(lines: string[]): Project[] {
  const projects: Project[] = [];
  let currentProject: Project | null = null;
  let employeeCheckLines: string[] | null = null;

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isProjectStartLine(line)) {
      const projectId = parseProjectId(line);

      if (!currentProject || currentProject.projectId !== projectId) {
        currentProject = { projectId, employeeChecks: [] };
        projects.push(currentProject);
      }
    } else if (currentProject && isEmployeeCheckStart(line)) {
      // Only parse a check if this is a new check start, but not the first.
      if (employeeCheckLines) {
        const employeeNameLine = lines[i + 2];

        // If there is no employee name, we've passed a page break and need to repair it.
        if (employeeNameLine.startsWith(" ")) {
          employeeCheckLines = employeeCheckLines.slice(
            0,
            employeeCheckLines.length - 12
          );

          i += 2;

          continue;
        } else {
          const parsedCheck = parseEmployeeCheck(employeeCheckLines);
          currentProject.employeeChecks.push(parsedCheck);
        }
      }

      employeeCheckLines = [line];
    } else if (employeeCheckLines) {
      employeeCheckLines.push(line);
    }

    i++;
  }

  return projects;
}

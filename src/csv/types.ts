import { ParsedReport } from "../parseReport";

export type Header = {
  id: string;
  title: string;
};

export type Format = {
  label: string;
  header: Header[];
  toRows: (parsedReport: ParsedReport) => Record<string, unknown>[];
};

import { Format } from "./types";
import { ParsedReport } from "../parseReport";
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import path from "path";

export type WriteCsvParams = {
  parsedReport: ParsedReport;
  format: Format;
  filePath: string;
};

export async function writeCsv({
  parsedReport,
  format,
  filePath,
}: WriteCsvParams) {
  const outDir = path.dirname(filePath);

  const rows = format.toRows(parsedReport);

  const outputPath = path.join(
    outDir,
    `${parsedReport.reportDate.toLocaleDateString().replace(/\//g, "-")}_${
      format.label
    }.csv`
  );

  const csvWriter = createCsvWriter({
    path: outputPath,
    header: format.header,
  });

  await csvWriter.writeRecords(rows);
}

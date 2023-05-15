import fs from "fs";
import { getEmarsFormat } from "./csv/formats/emars";
import { ipcRenderer } from "electron";
import { parseReport } from "./parseReport";
import { writeCsv } from "./csv/writeCsv";

const fileSelectBtn = document.getElementById("file-select-btn");

fileSelectBtn?.addEventListener("click", () => {
  ipcRenderer.send("open-file-dialog");
});

// File selected event listener
ipcRenderer.on("file-selected", (_, filePath) => {
  // Read the file using fs.readFile and perform your parsing logic
  fs.readFile(filePath, "utf-8", async (err, data) => {
    if (err) {
      console.error("An error occurred reading the file: " + err.message);
      throw err;
    }

    const parsedReport = parseReport(data);

    fs.writeFileSync("output.json", JSON.stringify(parsedReport));

    await writeCsv({
      parsedReport,
      // TODO: provide a way to choose format
      format: getEmarsFormat(parsedReport),
      filePath,
    });
  });
});

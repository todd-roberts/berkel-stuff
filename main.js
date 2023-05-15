"use strict";

// src/main.ts
var import_electron = require("electron");
var mainWindow = null;
var createWindow = () => {
  mainWindow = new import_electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools();
};
import_electron.app.on("ready", createWindow);
import_electron.app.on("window-all-closed", function() {
  if (process.platform !== "darwin")
    import_electron.app.quit();
});
import_electron.app.on("activate", function() {
  if (import_electron.BrowserWindow.getAllWindows().length === 0)
    createWindow();
});
import_electron.ipcMain.on("open-file-dialog", async (event) => {
  try {
    const result = await import_electron.dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"]
    });
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      event.reply("file-selected", filePath);
    }
  } catch (err) {
    console.error(err);
  }
});

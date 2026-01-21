"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  notify: (title, body) => {
    electron.ipcRenderer.send("show-notification", { title, body });
  }
});

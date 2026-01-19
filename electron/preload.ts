import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  notify: (title: string, body: string) => {
    ipcRenderer.send("show-notification", { title, body });
  },
});

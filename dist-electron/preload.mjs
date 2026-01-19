"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("electron",{notify:(n,o)=>{e.ipcRenderer.send("show-notification",{title:n,body:o})}});

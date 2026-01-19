import { app as n, BrowserWindow as r, ipcMain as d, Notification as i } from "electron";
import { fileURLToPath as p } from "node:url";
import o from "node:path";
const t = o.dirname(p(import.meta.url));
process.env.APP_ROOT = o.join(t, "..");
const E = process.env.VITE_DEV_SERVER_URL, V = o.join(process.env.APP_ROOT, "dist-electron"), s = o.join(t, "renderer"), R = o.join(t, "preload", "preload.js");
process.env.VITE_PUBLIC = E ? o.join(process.env.APP_ROOT, "public") : s;
let e;
function a() {
  e = new r({
    width: 800,
    height: 400,
    resizable: !1,
    autoHideMenuBar: !0,
    webPreferences: {
      preload: R,
      contextIsolation: !0,
      nodeIntegration: !1
    }
  }), process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(o.join(s, "index.html")), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  r.getAllWindows().length === 0 && a();
});
n.whenReady().then(a);
d.on(
  "show-notification",
  (_, { title: l, body: c }) => {
    i.isSupported() && new i({
      title: l,
      body: c
    }).show();
  }
);
export {
  V as MAIN_DIST,
  E as VITE_DEV_SERVER_URL
};

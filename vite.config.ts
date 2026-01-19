import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron/simple";

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: "electron/main.ts",
        outDir: "dist-electron/main",
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
        outDir: "dist-electron/preload",
      },
      renderer: {},
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "dist-electron/renderer"),
  },
});

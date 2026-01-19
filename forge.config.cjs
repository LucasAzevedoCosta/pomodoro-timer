const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    asar: true,
    executableName: "pomodoro-timer",
    icon: "./assets/icon",
  },
  rebuildConfig: {},
  makers: [
    // Windows Executable (Squirrel)
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "pomodoro-timer",
      },
    },
    // macOS Installer (.dmg)
    {
      name: "@electron-forge/maker-dmg",
      config: {
        // configuração opcional de ícone/background aqui
      },
    },
    // Linux Debian (.deb)
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          homepage: "https://seusite.com",
          description: "Um timer Pomodoro para produtividade",
          productDescription:
            "Aplicativo Pomodoro que ajuda a organizar seus períodos de foco e descanso.",
        },
      },
    },
    // ZIP como fallback genérico
    {
      name: "@electron-forge/maker-zip",
      platforms: ["linux"], // só para linux como fallback
    },
  ],
};

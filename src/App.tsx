import { useState } from "react";
import "./index.css";

import { PomodoroTimer } from "./components/PomodoroTimer";
import { SettingsScreen } from "./components/SettingsScreen";
import { ThemeSelector } from "./components/ThemeSelector";

import { PomodoroSettings, DEFAULT_SETTINGS } from "./types";
import { useTheme } from "./hooks/useTheme";

export function App() {
  const [showSettings, setShowSettings] = useState(false);

  const { theme, themes, changeTheme } = useTheme("mountains");

  const [settings, setSettings] = useState<
    PomodoroSettings & { longBreakEnabled: boolean }
  >({
    ...DEFAULT_SETTINGS,
    longBreakEnabled: true,
  });

  if (showSettings) {
    return (
      <SettingsScreen
        onBack={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    );
  }

  return (
    <div className="app-container">
      <ThemeSelector
        theme={theme}
        themes={themes}
        onThemeChange={changeTheme}
        onOpenSettings={() => setShowSettings(true)}
      />

      <PomodoroTimer theme={theme} settings={settings} />
    </div>
  );
}

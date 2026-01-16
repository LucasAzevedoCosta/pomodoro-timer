import { useState } from "react";
import "./index.css";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { PomodoroSettings, DEFAULT_SETTINGS, Theme } from "./types";
import { SettingsScreen } from "./components/SettingsScreen";

export function App() {
  const [theme, setTheme] = useState<Theme>("mountains");
  const [showSettings, setShowSettings] = useState(false);

  // Inicializa settings com DEFAULT_SETTINGS e adiciona longBreakEnabled
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
      <div className="theme-selector">
        {(["mountains", "forest", "neon", "minimal"] as Theme[]).map((t) => (
          <button
            key={t}
            className={`theme-btn ${theme === t ? "active" : ""}`}
            onClick={() => setTheme(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <button
          className="theme-btn settings-icon-btn"
          onClick={() => setShowSettings(true)}
          title="Settings"
        >
          ⚙️
        </button>
      </div>

      <PomodoroTimer theme={theme} settings={settings} />
    </div>
  );
}


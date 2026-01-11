import { useState } from "react";
import PomodoroTimer from "./components/PomodoroTimer";
import SettingsScreen from "./components/SettingsScreen";
import "./index.css";

function App() {
  const [theme, setTheme] = useState<
    "mountains" | "forest" | "neon" | "minimal"
  >("mountains");
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    soundEnabled: true,
    notificationsEnabled: true,
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
        <button
          className={`theme-btn ${theme === "mountains" ? "active" : ""}`}
          onClick={() => setTheme("mountains")}
        >
          Mountains
        </button>
        <button
          className={`theme-btn ${theme === "forest" ? "active" : ""}`}
          onClick={() => setTheme("forest")}
        >
          Forest
        </button>
        <button
          className={`theme-btn ${theme === "neon" ? "active" : ""}`}
          onClick={() => setTheme("neon")}
        >
          Neon
        </button>
        <button
          className={`theme-btn ${theme === "minimal" ? "active" : ""}`}
          onClick={() => setTheme("minimal")}
        >
          Minimal
        </button>
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

export default App;

import { useState } from "react";
import "./index.css";
import ThemeSelector, { Theme } from "./components/ThemeSelector";
import PomodoroTimer from "./components/PomodoroTimer";

function App() {
  const [theme, setTheme] = useState<Theme>("mountains");

  return (
    <div className="app-container">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <PomodoroTimer theme={theme} />
    </div>
  );
}

export default App;

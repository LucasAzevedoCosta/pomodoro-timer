import React from "react";

export type Theme = "mountains" | "forest" | "neon" | "minimal";

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  theme,
  setTheme,
}) => {
  return (
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
    </div>
  );
};

export default ThemeSelector;

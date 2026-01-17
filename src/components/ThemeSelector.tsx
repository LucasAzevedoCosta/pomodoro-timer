import { Theme } from "../types/types";

interface ThemeSelectorProps {
  theme: Theme;
  themes: Theme[];
  onThemeChange: (theme: Theme) => void;
  onOpenSettings: () => void;
}

export const ThemeSelector = ({
  theme,
  themes,
  onThemeChange,
  onOpenSettings,
}: ThemeSelectorProps) => {
  return (
    <div className="theme-selector">
      {themes.map((t) => (
        <button
          key={t}
          className={`theme-btn ${theme === t ? "active" : ""}`}
          onClick={() => onThemeChange(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}

      <button
        className="theme-btn settings-icon-btn"
        onClick={onOpenSettings}
        title="Settings"
      >
        ⚙️
      </button>
    </div>
  );
};

import { ChevronLeft } from "lucide-react";
import "./styles/SettingsScreen.css";
import { SettingsScreenProps, TIME_STEP } from "../types/types";
import { useSettings } from "../hooks/useSettings";

export const SettingsScreen = ({
  onBack,
  settings,
  onSettingsChange,
}: SettingsScreenProps) => {
  const {
    handleTimeChange,
    handleLongBreakChange,
    toggleSetting,
    handleCyclesChange,
  } = useSettings({ settings, onSettingsChange });

  return (
    <div className="settings-screen">
      <div className="settings-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={28} />
        </button>
        <h1 className="settings-title">Settings</h1>
        <div className="header-spacer" />
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2 className="section-title">Timer Durations</h2>

          <div className="settings-item">
            <label className="item-label">Focus Time</label>
            <div className="item-controls">
              <button
                className="arrow-btn"
                onClick={() =>
                  handleTimeChange("focusTime", settings.focusTime - TIME_STEP)
                }
              >
                ‹
              </button>
              <span className="item-value">{settings.focusTime} min</span>
              <button
                className="arrow-btn"
                onClick={() =>
                  handleTimeChange("focusTime", settings.focusTime + TIME_STEP)
                }
              >
                ›
              </button>
            </div>
          </div>

          <div className="settings-item">
            <label className="item-label">Short Break</label>
            <div className="item-controls">
              <button
                className="arrow-btn"
                onClick={() =>
                  handleTimeChange(
                    "shortBreakTime",
                    settings.shortBreakTime - TIME_STEP
                  )
                }
              >
                ‹
              </button>
              <span className="item-value">{settings.shortBreakTime} min</span>
              <button
                className="arrow-btn"
                onClick={() =>
                  handleTimeChange(
                    "shortBreakTime",
                    settings.shortBreakTime + TIME_STEP
                  )
                }
              >
                ›
              </button>
            </div>
          </div>

          <div className="settings-item">
            <label className="item-label">Long Break</label>
            <div className="item-controls">
              <button
                className="arrow-btn"
                onClick={() => handleLongBreakChange(false)}
                disabled={
                  !settings.longBreakEnabled && settings.longBreakTime <= 5
                }
              >
                ‹
              </button>
              <span className="item-value">
                {settings.longBreakEnabled
                  ? `${settings.longBreakTime} min`
                  : "Disabled"}
              </span>
              <button
                className="arrow-btn"
                onClick={() => handleLongBreakChange(true)}
              >
                ›
              </button>
            </div>
          </div>

          <div className="settings-item">
            <label className="item-label">Focus Count</label>
            <div className="item-controls">
              <button
                className="arrow-btn"
                onClick={() =>
                  handleCyclesChange(settings.cyclesBeforeLongBreak - 1)
                }
              >
                ‹
              </button>
              <span className="item-value">
                {settings.cyclesBeforeLongBreak}
              </span>
              <button
                className="arrow-btn"
                onClick={() =>
                  handleCyclesChange(settings.cyclesBeforeLongBreak + 1)
                }
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">Notifications</h2>

          <div className="settings-item toggle-item">
            <label className="item-label">Sound Effects</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={() => toggleSetting("soundEnabled")}
                id="sound-toggle"
                className="toggle-input"
              />
              <label htmlFor="sound-toggle" className="toggle-label">
                <span className="toggle-slider" />
              </label>
            </div>
          </div>

          <div className="settings-item toggle-item">
            <label className="item-label">Desktop Notifications</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={() => toggleSetting("notificationsEnabled")}
                id="notif-toggle"
                className="toggle-input"
              />
              <label htmlFor="notif-toggle" className="toggle-label">
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="action-btn save-btn" onClick={onBack}>
            Save
          </button>
          <button className="action-btn cancel-btn" onClick={onBack}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

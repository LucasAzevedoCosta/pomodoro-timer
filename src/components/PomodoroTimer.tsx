import "./styles/clock.css";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { PomodoroTimerProps } from "../types/types";
import { usePomodoro } from "../hooks/usePomodoro";

export const PomodoroTimer = ({ theme, settings }: PomodoroTimerProps) => {
  const {
    mode,
    timeLeft,
    isRunning,
    completedPomodoros,
    progress,
    formatTime,
    toggleTimer,
    resetTimer,
    skipTimer,
  } = usePomodoro(settings);

  return (
    <div className={`pomodoro-container theme-${theme}`}>
      <div className="timer-card">
        <div className="timer-display">
          <svg className="progress-ring" viewBox="0 0 300 300">
            <circle className="progress-ring-bg" cx="150" cy="150" r="140" />
            <circle
              className="progress-ring-fill"
              cx="150"
              cy="150"
              r="140"
              style={{ strokeDashoffset: 880 - (880 * progress) / 100 }}
            />
          </svg>

          <div className="timer-content">
            <div className="timer-text">{formatTime(timeLeft)}</div>
            <div className="timer-label">
              {mode === "pomodoro"
                ? "Focus Time"
                : mode === "shortBreak"
                  ? "Short Break"
                  : "Long Break"}
            </div>
          </div>
        </div>

        <div className="timer-controls">
          <button className="control-btn reset-btn" onClick={resetTimer}>
            <RotateCcw size={24} />
          </button>

          <button className="control-btn play-btn" onClick={toggleTimer}>
            {isRunning ? <Pause size={32} /> : <Play size={32} />}
          </button>

          {mode !== "pomodoro" && (
            <button className="control-btn reset-btn" onClick={skipTimer}>
              <SkipForward size={24} />
            </button>
          )}

          <div className="pomodoro-bubbles">
            {Array.from({ length: settings.cyclesBeforeLongBreak }).map(
              (_, index) => {
                const isCompleted =
                  index < completedPomodoros % settings.cyclesBeforeLongBreak;

                return (
                  <div
                    key={index}
                    className={`bubble ${isCompleted ? "completed" : ""}`}
                  >
                    {isCompleted && <span className="checkmark">✓</span>}
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

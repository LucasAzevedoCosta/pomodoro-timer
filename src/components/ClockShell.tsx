import { Play, Pause, RotateCcw } from "lucide-react";
import { TimerMode } from "../types";

interface ClockShellProps {
  mode: TimerMode;
  timeLeft: number;
  progress: number;
  isRunning: boolean;
  completedPomodoros: number;
  onToggle: () => void;
  onReset: () => void;
  onSwitchMode: (mode: TimerMode) => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const ClockShell = ({
  mode,
  timeLeft,
  progress,
  isRunning,
  completedPomodoros,
  onToggle,
  onReset,
  onSwitchMode,
}: ClockShellProps) => {
  return (
    <div className="timer-card">
      <div className="mode-selector">
        {(["pomodoro", "shortBreak", "longBreak"] as TimerMode[]).map((m) => (
          <button
            key={m}
            className={`mode-btn ${mode === m ? "active" : ""}`}
            onClick={() => onSwitchMode(m)}
          >
            {m === "pomodoro"
              ? "Pomodoro"
              : m === "shortBreak"
              ? "Short Break"
              : "Long Break"}
          </button>
        ))}
      </div>

      <div className="timer-display">
        <svg className="progress-ring" viewBox="0 0 300 300">
          <circle className="progress-ring-bg" cx="150" cy="150" r="140" />
          <circle
            className="progress-ring-fill"
            cx="150"
            cy="150"
            r="140"
            style={{
              strokeDashoffset: 880 - (880 * progress) / 100,
            }}
          />
        </svg>

        <div className="timer-content">
          <div className="timer-text">{formatTime(timeLeft)}</div>
          <div className="timer-label">
            {mode === "pomodoro" ? "Focus Time" : "Break Time"}
          </div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="control-btn reset-btn" onClick={onReset}>
          <RotateCcw size={24} />
        </button>

        <button className="control-btn play-btn" onClick={onToggle}>
          {isRunning ? <Pause size={32} /> : <Play size={32} />}
        </button>

        <div className="pomodoro-count">
          <span className="count-label">Pomodoros</span>
          <span className="count-value">{completedPomodoros}</span>
        </div>
      </div>
    </div>
  );
};

export default ClockShell;

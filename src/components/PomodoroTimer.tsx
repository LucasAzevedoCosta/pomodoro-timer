import { useEffect } from 'react';
import { setupPomodoro } from '../hooks/pomodoro';
import '../style.css';

export default function PomodoroTimer() {
  useEffect(() => {
    setupPomodoro();
  }, []);

  return (
    <div className="pomodoro-container">
      <h1 className="app-title">Pomodoro Timer</h1>

      <div className="mode-selector">
        <button className="mode-btn active" data-mode="pomodoro">Pomodoro</button>
        <button className="mode-btn" data-mode="short-break">Short Break</button>
        <button className="mode-btn" data-mode="long-break">Long Break</button>
      </div>

      <div className="timer-display">
        <span id="timer">25:00</span>
      </div>

      <div className="controls">
        <button id="start-btn" className="control-btn primary">Start</button>
        <button id="reset-btn" className="control-btn secondary">Reset</button>
      </div>

      <div className="session-info">
        <p>
          Session <span id="session-count">1</span> of 4
        </p>
      </div>
    </div>
  );
}

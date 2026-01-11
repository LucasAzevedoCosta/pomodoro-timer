import "./styles/clock.css";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";
type Theme = "mountains" | "forest" | "neon" | "minimal";

interface PomodoroTimerProps {
  theme: Theme;
  settings: {
    focusTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    soundEnabled: boolean;
    notificationsEnabled: boolean;
  };
}

const getTimerDurations = (settings: any) => ({
  pomodoro: settings.focusTime * 60,
  shortBreak: settings.shortBreakTime * 60,
  longBreak: settings.longBreakTime * 60,
});

const PomodoroTimer = ({ theme, settings }: PomodoroTimerProps) => {
  const TIMER_DURATIONS = getTimerDurations(settings);
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (mode === "pomodoro") {
      setCompletedPomodoros((prev) => prev + 1);
    }
    playSound();
  };

  const playSound = () => {
    if (!settings.soundEnabled) return;

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress =
    ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100;

  return (
    <div className={`pomodoro-container theme-${theme}`}>
      <div className="timer-card">
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === "pomodoro" ? "active" : ""}`}
            onClick={() => switchMode("pomodoro")}
          >
            Pomodoro
          </button>
          <button
            className={`mode-btn ${mode === "shortBreak" ? "active" : ""}`}
            onClick={() => switchMode("shortBreak")}
          >
            Short Break
          </button>
          <button
            className={`mode-btn ${mode === "longBreak" ? "active" : ""}`}
            onClick={() => switchMode("longBreak")}
          >
            Long Break
          </button>
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
          <button className="control-btn reset-btn" onClick={resetTimer}>
            <RotateCcw size={24} />
          </button>
          <button className="control-btn play-btn" onClick={toggleTimer}>
            {isRunning ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <div className="pomodoro-count">
            <span className="count-label">Pomodoros</span>
            <span className="count-value">{completedPomodoros}</span>
          </div>
        </div>

        {theme === "mountains" && <div className="mountain-overlay" />}
        {theme === "forest" && <div className="forest-overlay" />}
        {theme === "neon" && <div className="neon-particles" />}
      </div>

      {isRunning && <div className="pulse-effect" />}
    </div>
  );
};

export default PomodoroTimer;

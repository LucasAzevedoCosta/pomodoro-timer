import { useEffect, useRef, useState } from "react";
import "./styles/clock.css";
import ClockShell from "./ClockShell";
import { Theme } from "./ThemeSelector";
import { TIMER_DURATIONS, TimerMode } from "../types";
import ThemeOverlay from "./ThemeOverlay";

interface TimerProps {
  theme: Theme;
}

const PomodoroTimer = ({ theme }: TimerProps) => {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(
        () => setTimeLeft((t) => t - 1),
        1000
      );
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleComplete = () => {
    setIsRunning(false);
    if (mode === "pomodoro") {
      setCompletedPomodoros((p) => p + 1);
    }
  };

  const progress =
    ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100;

  return (
    <div className={`pomodoro-container theme-${theme}`}>
      <ClockShell
        mode={mode}
        timeLeft={timeLeft}
        progress={progress}
        isRunning={isRunning}
        completedPomodoros={completedPomodoros}
        onToggle={() => setIsRunning((r) => !r)}
        onReset={() => {
          setIsRunning(false);
          setTimeLeft(TIMER_DURATIONS[mode]);
        }}
        onSwitchMode={(m) => {
          setMode(m);
          setTimeLeft(TIMER_DURATIONS[m]);
          setIsRunning(false);
        }}
      />

      <ThemeOverlay theme={theme} />

      {isRunning && <div className="pulse-effect" />}
    </div>
  );
};

export default PomodoroTimer;

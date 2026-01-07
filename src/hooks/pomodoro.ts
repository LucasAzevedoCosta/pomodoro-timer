import { useCallback, useEffect, useRef, useState } from "react";

export interface PomodoroSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
}

export type TimerMode = "focus" | "shortBreak" | "longBreak";

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cyclesBeforeLongBreak: 4,
};

export function usePomodoro() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const getDurationByMode = useCallback(
    (m: TimerMode, s = settings) => {
      switch (m) {
        case "focus":
          return s.focusDuration;
        case "shortBreak":
          return s.shortBreakDuration;
        case "longBreak":
          return s.longBreakDuration;
      }
    },
    [settings]
  );

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setIsRunning(false);
      setTimeLeft(getDurationByMode(newMode) * 60);
    },
    [getDurationByMode]
  );

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(getDurationByMode(mode) * 60);
  };

  const handleTimerComplete = useCallback(() => {
    if (mode === "focus") {
      const newCycle = cycleCount + 1;
      setCycleCount(newCycle);

      if (newCycle % settings.cyclesBeforeLongBreak === 0) {
        switchMode("longBreak");
      } else {
        switchMode("shortBreak");
      }
    } else {
      switchMode("focus");
    }
  }, [mode, cycleCount, settings.cyclesBeforeLongBreak, switchMode]);

  const updateSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    setIsRunning(false);
    setTimeLeft(getDurationByMode(mode, newSettings) * 60);
  };

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, handleTimerComplete]);

  return {
    settings,
    mode,
    timeLeft,
    isRunning,
    cycleCount,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
  };
}

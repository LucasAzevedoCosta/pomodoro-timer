import { useState, useEffect, useRef, useCallback } from "react";
import { PomodoroSettings, TimerMode } from "../types";

const getTimerDurations = (
  settings: PomodoroSettings
): Record<TimerMode, number> => ({
  pomodoro: settings.focusTime * 60,
  shortBreak: settings.shortBreakTime * 60,
  longBreak: settings.longBreakEnabled ? settings.longBreakTime * 60 : 0,
});

export function usePomodoro(settings: PomodoroSettings) {
  const TIMER_DURATIONS = getTimerDurations(settings);

  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const intervalRef = useRef<number | null>(null);

  const playSound = useCallback(() => {
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

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [settings.soundEnabled]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);

    if (mode === "pomodoro") {
      const nextPomodoroCount = completedPomodoros + 1;
      setCompletedPomodoros(nextPomodoroCount);

      let nextMode: TimerMode = "shortBreak";

      if (
        settings.longBreakEnabled &&
        nextPomodoroCount % settings.cyclesBeforeLongBreak === 0
      ) {
        nextMode = "longBreak";
      }

      setMode(nextMode);
      setTimeLeft(TIMER_DURATIONS[nextMode]);
    } else {
      setMode("pomodoro");
      setTimeLeft(TIMER_DURATIONS.pomodoro);
    }

    playSound();
  }, [mode, completedPomodoros, settings, TIMER_DURATIONS, playSound]);

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
  }, [isRunning, timeLeft, handleTimerComplete]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progress =
    ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100;

  return {
    mode,
    timeLeft,
    isRunning,
    completedPomodoros,
    progress,
    formatTime,
    toggleTimer,
    resetTimer,
    settings,
  };
}

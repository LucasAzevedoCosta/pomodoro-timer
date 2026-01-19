import { useState, useEffect, useRef, useCallback } from "react";
import {
  NotificationKey,
  NotificationMessage,
  PomodoroSettings,
  TimerMode,
} from "../types/types";

const getTimerDurations = (
  settings: PomodoroSettings,
): Record<TimerMode, number> => ({
  pomodoro: settings.focusTime * 60,
  shortBreak: settings.shortBreakTime * 60,
  longBreak: settings.longBreakEnabled ? settings.longBreakTime * 60 : 0,
});

const NOTIFICATIONS: Record<NotificationKey, NotificationMessage> = {
  SHORT_BREAK_STARTED: {
    title: "Short break started",
    body: "Take a moment to relax ☕",
  },
  LONG_BREAK_STARTED: {
    title: "Long break started",
    body: "Enjoy a longer rest 🧘",
  },
  BREAK_FINISHED: {
    title: "Break finished",
    body: "Time to focus again 🎯",
  },
  BREAK_SKIPPED: {
    title: "Break skipped",
    body: "Back to focus mode 🚀",
  },
  CYCLE_FINISHED: {
    title: "Cycle completed",
    body: "New focus cycle started 🔁",
  },
};

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
      audioContext.currentTime + 0.5,
    );

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }, [settings.soundEnabled]);
  const notify = useCallback(
    (key: NotificationKey) => {
      if (!settings.notificationsEnabled) return;

      const notification = NOTIFICATIONS[key];
      window.electron?.notify(notification.title, notification.body);
    },
    [settings.notificationsEnabled],
  );

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);

    if (mode === "pomodoro") {
      const nextCount = completedPomodoros + 1;
      setCompletedPomodoros(nextCount);

      const isLastCycle = nextCount % settings.cyclesBeforeLongBreak === 0;

      if (settings.longBreakEnabled && isLastCycle) {
        setMode("longBreak");
        setTimeLeft(TIMER_DURATIONS.longBreak);
        notify("LONG_BREAK_STARTED");
      } else {
        setMode("shortBreak");
        setTimeLeft(TIMER_DURATIONS.shortBreak);
        notify("SHORT_BREAK_STARTED");
      }
    } else {
      setMode("pomodoro");
      setTimeLeft(TIMER_DURATIONS.pomodoro);
      notify("BREAK_FINISHED");
    }

    playSound();
  }, [mode, completedPomodoros, settings, TIMER_DURATIONS, notify, playSound]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          handleTimerComplete();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, handleTimerComplete]);

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
    TIMER_DURATIONS[mode] > 0
      ? ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100
      : 0;

  const skipTimer = () => {
    if (mode === "pomodoro") return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(false);

    setMode("pomodoro");
    setTimeLeft(TIMER_DURATIONS.pomodoro);

    notify("BREAK_SKIPPED");
    playSound();
  };

  return {
    mode,
    timeLeft,
    isRunning,
    completedPomodoros,
    progress,
    formatTime,
    toggleTimer,
    resetTimer,
    skipTimer,
    settings,
  };
}

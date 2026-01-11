export interface PomodoroSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
}

export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  cyclesBeforeLongBreak: 4,
};

export interface Props {
  settings: PomodoroSettings;
  onSave: (settings: PomodoroSettings) => void;
  onCancel: () => void;
}
export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";
export type Theme = "mountains" | "forest" | "neon" | "minimal";

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export interface SettingsScreenProps {
  onBack: () => void;
  settings: {
    focusTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    soundEnabled: boolean;
    notificationsEnabled: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

export interface PomodoroSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  cyclesBeforeLongBreak: number;
}

export type TimerMode = "focus" | "shortBreak" | "longBreak";

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
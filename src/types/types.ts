export type Theme = "mountains" | "forest" ;


export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";


export type PomodoroSettings = {
  // tempos (em minutos)
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;

  // ciclos
  cyclesBeforeLongBreak: number;
  longBreakEnabled: boolean;

  // efeitos
  soundEnabled: boolean;
  notificationsEnabled: boolean;
};


export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,

  cyclesBeforeLongBreak: 4,
  longBreakEnabled: true,

  soundEnabled: true,
  notificationsEnabled: true,
};

export type TimerDurationsSettings = Pick<
  PomodoroSettings,
  "focusTime" | "shortBreakTime" | "longBreakTime"
>;

export type ToggleSettingKey = keyof Pick<
  PomodoroSettings,
  "soundEnabled" | "notificationsEnabled" | "longBreakEnabled"
>;


export const TIME_STEP = 5;

export interface PomodoroTimerProps {
  theme: Theme;
  settings: PomodoroSettings;
}

export interface SettingsScreenProps {
  onBack: () => void;
  settings: PomodoroSettings;
  onSettingsChange: (settings: PomodoroSettings) => void;
}

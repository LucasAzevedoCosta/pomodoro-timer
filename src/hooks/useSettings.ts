import { SettingsScreenProps, TIME_STEP, ToggleSettingKey } from "../types";

type UseSettingsParams = Pick<
  SettingsScreenProps,
  "settings" | "onSettingsChange"
>;

export function useSettings({ settings, onSettingsChange }: UseSettingsParams) {
  const updateSettings = (partial: Partial<typeof settings>) => {
    onSettingsChange({
      ...settings,
      ...partial,
    });
  };

  const handleTimeChange = (
    key: "focusTime" | "shortBreakTime" | "longBreakTime",
    value: number
  ) => {
    // Descomentar para testes referenetes a os ciclo do timer para conseguiu um tempo de 6 segundo no timer
     const clampedValue = Math.max(0.1, Math.min(60, value));
//    const clampedValue = Math.max(5, Math.min(60, value));

    updateSettings({ [key]: clampedValue });
  };

  const handleLongBreakChange = (increase: boolean) => {
    if (increase) {
      updateSettings({
        longBreakTime: settings.longBreakTime + TIME_STEP,
        longBreakEnabled: true,
      });
      return;
    }

    if (settings.longBreakTime <= 5) {
      updateSettings({ longBreakEnabled: false });
    } else {
      updateSettings({
        longBreakTime: Math.max(5, settings.longBreakTime - TIME_STEP),
      });
    }
  };

  const toggleSetting = (key: ToggleSettingKey | "longBreakEnabled") => {
    updateSettings({
      [key]: !settings[key],
    });
  };

  const handleCyclesChange = (value: number) => {
    const clampedValue = Math.max(1, Math.min(10, value));
    updateSettings({ cyclesBeforeLongBreak: clampedValue });
  };

  return {
    handleTimeChange,
    handleLongBreakChange,
    toggleSetting,
    handleCyclesChange,
  };
}
